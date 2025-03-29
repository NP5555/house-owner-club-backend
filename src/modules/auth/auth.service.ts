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
    try {
      const token = new TokenPayloadDto({
        expiresIn: this.configService.authConfig.jwtExpirationTime,
        accessToken: await this.jwtService.signAsync({
          userId: data.userId,
          type: TokenType.OTP_ACCESS_TOKEN,
          role: data.role,
        }),
      });
      
      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000);
      console.log(`Generated OTP for user ${data.userId}: ${otp} (remove in production)`);
      
      // Update user's OTP
      await this.userService.updateOTP(data.user.id, otp);
      
      // Try to send email with OTP
      try {
        console.log('Attempting to send OTP email to:', data.user.email);
        
        const emailContent = {
          to: data.user.email,
          from: '"Home Owners Club" <hello@hoc.com>',
          subject: "Your Login OTP Code - Home Owners Club",
          text: `Your OTP code is: ${otp}\n\nPlease use this code to complete your login.\n\nThis code will expire soon, please use it immediately.`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
              <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="color: #333; text-align: center;">Home Owners Club</h2>
                <h3 style="color: #444; text-align: center;">Your Login OTP Code</h3>
                <div style="text-align: center; padding: 20px; background-color: #f8f8f8; border-radius: 5px; margin: 20px 0;">
                  <h1 style="color: #2c3e50; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
                </div>
                <p style="color: #666; text-align: center;">Please use this code to complete your login.</p>
                <p style="color: #888; font-size: 12px; text-align: center; margin-top: 20px;">This code will expire soon, please use it immediately.</p>
                <p style="color: #888; font-size: 12px; text-align: center;">If you didn't request this code, please ignore this email.</p>
              </div>
            </div>
          `
        };

        const result = await this.mailerService.sendMail(emailContent);
        console.log('OTP email sent successfully:', result);
        
        return token;
      } catch (error) {
        console.error('Failed to send OTP email:', error);
        throw new HttpException({
          message: 'Failed to send OTP email',
          error: error.message
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } catch (error) {
      console.error('Error in createAccessTokenOTP:', error);
      throw new HttpException({
        message: 'Error creating access token OTP',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
    }
    const newPasswordHash = await generateHash(newPassword);
    user.password = newPasswordHash;
    await this.userService.update(user);
  }

  async sendForgotPasswordEmail(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);
    const resetPasswordToken = uuidv4();
    // Implementation pending
  }
}
