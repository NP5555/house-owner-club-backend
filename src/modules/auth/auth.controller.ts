import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  Version,
} from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { RoleType } from "../../constants";
import { ApiFile, Auth, AuthUser } from "../../decorators";
import { IFile } from "../../interfaces";
import { UserDto } from "../user/dtos/user.dto";
import { UserEntity } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { LoginPayloadDto } from "./dto/LoginPayloadDto";
import { UserLoginDto } from "./dto/UserLoginDto";
import { UserRegisterDto } from "./dto/UserRegisterDto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: "User info with access token",
  })
  async userLogin(
    @Body() userLoginDto: UserLoginDto
  ): Promise<LoginPayloadDto> {
    const userEntity = await this.authService.validateUser(userLoginDto);

    const token = await this.authService.createAccessTokenOTP({
      userId: userEntity.id,
      role: userEntity.role,
      user: userEntity.toDto(),
    });

    return new LoginPayloadDto(userEntity.toDto(), token);
  }

  @Post("login/:otp/:token")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: "User info with access token",
  })
  async userLoginOTP(
    @Param("otp") otp: number,
    @Param("token") token: string,
    @Res() res: any
  ): Promise<LoginPayloadDto> {
    const user = await this.authService.validateUserOTP(otp, token);

    const accessToken = await this.authService.createAccessToken({
      userId: user.id,
      role: user.role,
    });

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Login Successfully",
      data: { user, token:accessToken },
    });
  }

  @Post("register")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: "Successfully Registered" })
  @ApiFile({ name: "avatar" })
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto,
    @UploadedFile() file?: IFile
  ): Promise<UserDto> {
    const createdUser = await this.userService.createUser(
      userRegisterDto,
      file
    );

    return createdUser.toDto({
      isActive: true,
    });
  }

  @Post("developer")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: "Successfully Registered" })
  async developerRegister(
    @Body() userRegisterDto: UserRegisterDto,
    @Res() res: any
  ): Promise<any> {
    try {
      console.log('Developer registration request received with payload:', JSON.stringify(userRegisterDto));
      
      // Validate required fields
      if (!userRegisterDto.email || !userRegisterDto.password) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Email and password are required fields',
        });
      }
      
      // Validate role if provided (AGENT or DEVELOPER)
      if (userRegisterDto.role && 
          userRegisterDto.role !== RoleType.AGENT && 
          userRegisterDto.role !== RoleType.DEVELOPER) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid role. Role must be either AGENT or DEVELOPER',
        });
      }
      
      // Set default role if not provided
      if (!userRegisterDto.role) {
        userRegisterDto.role = RoleType.DEVELOPER;
      }
      
      console.log(`Attempting to create ${userRegisterDto.role} with email: ${userRegisterDto.email}`);
      
      const createdUser = await this.userService.createDeveloper(userRegisterDto);
      console.log('User created successfully:', createdUser.id);
      
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: `${userRegisterDto.role} successfully registered`,
        data: createdUser.toDto({
          isActive: true,
        }),
      });
    } catch (error) {
      console.error('Error in developer registration:', error);
      console.error('Error details:', error.stack);
      
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error during registration',
        error: error.stack,
      });
    }
  }

  @Version("1")
  @Get("me")
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER, RoleType.ADMIN, RoleType.AGENT, RoleType.DEVELOPER])
  @ApiOkResponse({ type: UserDto, description: "current user info" })
  getCurrentUser(@AuthUser() user: UserEntity): UserDto {
    return user.toDto();
  }

  @Post("change-password")
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER, RoleType.ADMIN, RoleType.AGENT, RoleType.DEVELOPER])
  @ApiOkResponse({ type: UserDto, description: "current user info" })
  async changePassword(
    @AuthUser() user: UserEntity,
    @Body() changePasswordDto: ChangePasswordDto,
    @Res() res: any
  ): Promise<UserDto> {
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: "Password changed successfully",
      data: await this.authService.changePassword(
        user,
        changePasswordDto.currentPassword,
        changePasswordDto.newPassword
      ),
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post("forgot-password")
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto
  ): Promise<void> {
    await this.authService.sendForgotPasswordEmail(forgotPasswordDto.email);
  }
}
