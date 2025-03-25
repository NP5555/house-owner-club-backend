"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const utils_1 = require("../../common/utils");
const constants_1 = require("../../constants");
const exceptions_1 = require("../../exceptions");
const api_config_service_1 = require("../../shared/services/api-config.service");
const user_service_1 = require("../user/user.service");
const TokenPayloadDto_1 = require("./dto/TokenPayloadDto");
const utils_2 = require("../../common/utils");
const uuid_1 = require("uuid");
const mailer_1 = require("@nestjs-modules/mailer");
let AuthService = class AuthService {
    constructor(jwtService, configService, userService, mailerService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.userService = userService;
        this.mailerService = mailerService;
    }
    async createAccessToken(data) {
        return new TokenPayloadDto_1.TokenPayloadDto({
            expiresIn: this.configService.authConfig.jwtExpirationTime,
            accessToken: await this.jwtService.signAsync({
                userId: data.userId,
                type: constants_1.TokenType.ACCESS_TOKEN,
                role: data.role,
            }),
        });
    }
    async createAccessTokenOTP(data) {
        try {
            const token = new TokenPayloadDto_1.TokenPayloadDto({
                expiresIn: this.configService.authConfig.jwtExpirationTime,
                accessToken: await this.jwtService.signAsync({
                    userId: data.userId,
                    type: constants_1.TokenType.OTP_ACCESS_TOKEN,
                    role: data.role,
                }),
            });
            const otp = Math.floor(100000 + Math.random() * 900000);
            console.log(`Generated OTP for user ${data.userId}: ${otp} (remove in production)`);
            await this.userService.updateOTP(data.user.id, otp);
            try {
                await this.mailerService.sendMail({
                    to: data.user.email,
                    from: `"noreply" <${process.env.MAIL_FROM || 'hello@hoc.com'}>`,
                    subject: "Home Owners Club - Your OTP Code",
                    text: `Your OTP code is: ${otp}\n\nPlease use this code to complete your login.`,
                });
                console.log(`OTP email sent to ${data.user.email}`);
            }
            catch (error) {
                console.error('Failed to send OTP email:', error);
            }
            return token;
        }
        catch (error) {
            console.error('Error in createAccessTokenOTP:', error);
            throw error;
        }
    }
    async validateUser(userLoginDto) {
        const user = await this.userService.findOne({
            email: userLoginDto.email,
        });
        const isPasswordValid = await (0, utils_1.validateHash)(userLoginDto.password, user === null || user === void 0 ? void 0 : user.password);
        if (!isPasswordValid) {
            throw new exceptions_1.UserNotFoundException();
        }
        return user;
    }
    async validateUserOTP(OTP, token) {
        if (token === 'undefined' || token === null) {
            throw new common_1.HttpException("Incorrect Token", common_1.HttpStatus.NOT_FOUND);
        }
        else {
            const decodedToken = this.jwtService.decode(token);
            const user = await this.userService.findOne({
                id: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.userId,
            });
            if (OTP !== (user === null || user === void 0 ? void 0 : user.otp)) {
                throw new common_1.HttpException("Incorrect OTP", common_1.HttpStatus.BAD_REQUEST);
            }
            const { password, referralCode, referredBy, avatar, otp } = user, userData = __rest(user, ["password", "referralCode", "referredBy", "avatar", "otp"]);
            return userData;
        }
    }
    async changePassword(user, currentPassword, newPassword) {
        const isPasswordValid = await (0, utils_1.validateHash)(currentPassword, user === null || user === void 0 ? void 0 : user.password);
        if (!isPasswordValid) {
            throw new common_1.HttpException("Current password is incorrect", common_1.HttpStatus.BAD_REQUEST);
        }
        const newPasswordHash = await (0, utils_2.generateHash)(newPassword);
        user.password = newPasswordHash;
        await this.userService.update(user);
    }
    async sendForgotPasswordEmail(email) {
        const user = await this.userService.findByEmail(email);
        const resetPasswordToken = (0, uuid_1.v4)();
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        api_config_service_1.ApiConfigService,
        user_service_1.UserService,
        mailer_1.MailerService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map