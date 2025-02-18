import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
  ValidationPipe,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

import { PageDto } from "../../common/dto/page.dto";
import { RoleType } from "../../constants";
import { ApiPageOkResponse, Auth, AuthUser, UUIDParam } from "../../decorators";
import { UseLanguageInterceptor } from "../../interceptors/language-interceptor.service";
import { TranslationService } from "../../shared/services/translation.service";
import { UpdateRoleDTO } from "./dtos/update-role.dto";
import { UserDto } from "./dtos/user.dto";
import { UsersPageOptionsDto } from "./dtos/users-page-options.dto";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";
import { UpdateStatusDTO } from "./dtos/update-status.dto";

@Controller("users")
@ApiTags("users")
export class UserController {
  constructor(
    private userService: UserService,
    private readonly translationService: TranslationService
  ) {}

  @Get("admin")
  @Auth([RoleType.USER, RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @UseLanguageInterceptor()
  async admin(@AuthUser() user: UserEntity) {
    const translation = await this.translationService.translate(
      "admin.keywords.admin"
    );

    return {
      text: `${translation} ${user.firstName}`,
    };
  }

  @Get()
  // @Auth([RoleType.USER, RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiPageOkResponse({
    description: "Get users list",
    type: PageDto,
  })
  async getUsers(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: UsersPageOptionsDto,
    @Res() res: any
  ): Promise<PageDto<UserDto>> {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Record Found",
      data: await this.userService.getUsers(pageOptionsDto),
    });
    return this.userService.getUsers(pageOptionsDto);
  }

  @Get("developer")
  // @Auth([RoleType.USER, RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiPageOkResponse({
    description: "Get developer list",
    type: PageDto,
  })
  async getDevelopers(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: UsersPageOptionsDto,
    @Res() res: any
  ): Promise<PageDto<UserDto>> {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Record Found",
      data: await this.userService.getDevelopers(pageOptionsDto),
    });
    return this.userService.getUsers(pageOptionsDto);
  }

  @Get("agent")
  // @Auth([RoleType.USER, RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiPageOkResponse({
    description: "Get developer list",
    type: PageDto,
  })
  async getAgents(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: UsersPageOptionsDto,
    @Res() res: any
  ): Promise<PageDto<UserDto>> {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Record Found",
      data: await this.userService.getAgents(pageOptionsDto),
    });
    return this.userService.getAgents(pageOptionsDto);
  }

  @Get("referredBy")
  // @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiPageOkResponse({
    description: "Get users list referredBy",
    type: PageDto,
  })
  getUsersReferredBy(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: UsersPageOptionsDto,
    @AuthUser() user: UserEntity
  ): Promise<PageDto<UserDto>> {
    return this.userService.getUsersReferredBy(pageOptionsDto, user);
  }

  @Get(":id")
  // @Auth([RoleType.USER, RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get users list",
    type: UserDto,
  })
  getUser(@UUIDParam("id") userId: Uuid): Promise<UserDto> {
    return this.userService.getUser(userId);
  }

  // @Post(':id')
  // // @Auth([RoleType.ADMIN])
  // @HttpCode(HttpStatus.OK)
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Update User KYC',
  //   type: UserDto,
  // })
  // updateUserKYC(@Body() @UUIDParam('id') @AuthUser() user:UserEntity ): Promise<UserDto> {
  //   return this.userService.updateKYC(user.id);
  // }

  @Post("updateRole")
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Update role",
    type: UserDto,
  })
  async updateUserRoleById(@Body() u: UpdateRoleDTO): Promise<UserDto> {
    return this.userService.updateRole(u.id, u.role);
  }

  @Post("updateStatus")
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Update status",
    type: UserDto,
  })
  async updateUserStatusById(
    @Body() u: UpdateStatusDTO,
    @Res() res: any
  ): Promise<UserDto> {
    const updataActive = await this.userService.updateStatus(u.id, u.isActive);
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Record updated",
      data: updataActive,
    });
    return this.userService.updateStatus(u.id, u.isActive);
  }
}
