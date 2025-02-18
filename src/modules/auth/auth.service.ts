import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { validateHash } from "../../common/utils";
import type { RoleType } from "../../constants";
import { TokenType } from "../../constants";
import { UserNotFoundException } from "../../exceptions";
import { ApiConfigService } from "../../shared/services/api-config.service";
import type { UserEntity } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { TokenPayloadDto } from "./dto/TokenPayloadDto";
import type { UserLoginDto } from "./dto/UserLoginDto";
import { generateHash } from "../../common/utils";
import { v4 as uuidv4 } from "uuid";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ApiConfigService,
    private userService: UserService,
    private mailerService: MailerService
  ) {}

  async createAccessToken(data: {
    role: RoleType;
    userId: Uuid;
  }): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
        type: TokenType.ACCESS_TOKEN,
        role: data.role,
      }),
    });
  }

  async createAccessTokenOTP(data: {
    role: RoleType;
    userId: Uuid;
    user: any;
  }): Promise<TokenPayloadDto | any> {
    const token = new TokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
        type: TokenType.OTP_ACCESS_TOKEN,
        role: data.role,
      }),
    });
    const otp = Math.floor(100000 + Math.random() * 900000);

    await this.userService.updateOTP(data.user.id, otp);

    // await this.mailerService.sendMail({
    //   to: data.user.email,
    //   from: '"noreply" <hello@hoc.com>',
    //   subject: "Home Owners club",
    //   template: "../../../templates/otp.hbs",
    //   context: {
    //     email: data.user.email,
    //     OTP: otp,
    //   },
    // });
    return token;
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
    const user = await this.userService.findOne({
      email: userLoginDto.email,
    });

    const isPasswordValid = await validateHash(
      userLoginDto.password,
      user?.password
    );

    if (!isPasswordValid) {
      throw new UserNotFoundException();
    }

    return user!;
  }

  async validateUserOTP(OTP: number, token: string): Promise< any> {

    if(token === 'undefined' || token === null){
        throw new HttpException(
            "Incorrect Token",
            HttpStatus.NOT_FOUND
          );
    }else{
        const decodedToken: any = this.jwtService.decode(token);
      const user = await this.userService.findOne({
        id: decodedToken?.userId,
      });

    if(OTP !== user?.otp){
        throw new HttpException(
            "Incorrect OTP",
            HttpStatus.BAD_REQUEST
          );
    }

    const {
        password,
        referralCode,
        referredBy,
        avatar,
        otp,
        ...userData
      } = user;


    return userData!;
    }
  }

  async changePassword(
    user: UserEntity,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const isPasswordValid = await validateHash(currentPassword, user?.password);
    if (!isPasswordValid) {
      throw new HttpException(
        "Current password is incorrect",
        HttpStatus.BAD_REQUEST
      );
      //   throw new Error('Current password is incorrect.');
    }
    const newPasswordHash = await generateHash(newPassword);
    user.password = newPasswordHash;
    await this.userService.update(user);
  }

  async sendForgotPasswordEmail(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);
    const resetPasswordToken = uuidv4();
    // user.resetPasswordToken = resetPasswordToken;
    // user.resetPasswordExpires = new Date(new Date().getTime() + 30 * 60 * 1000); // Token expires in 30 minutes
    // await this.userService.update(user);
    // await this.mailerService.sendMail({
    //   from: process.env.EMAIL_USERNAME,
    //   to: email,
    //   subject: 'Reset your password',
    //   text: `Click on the link to reset your password: ${process.env.APP_URL}/reset-password/${resetPasswordToken}`,
    // });
  }
}
