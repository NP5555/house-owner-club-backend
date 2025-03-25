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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../constants");
const decorators_1 = require("../../decorators");
const user_dto_1 = require("../user/dtos/user.dto");
const user_entity_1 = require("../user/user.entity");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("./auth.service");
const LoginPayloadDto_1 = require("./dto/LoginPayloadDto");
const UserLoginDto_1 = require("./dto/UserLoginDto");
const UserRegisterDto_1 = require("./dto/UserRegisterDto");
const change_password_dto_1 = require("./dto/change-password.dto");
const forgot_password_dto_1 = require("./dto/forgot-password.dto");
let AuthController = class AuthController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async userLogin(userLoginDto) {
        const userEntity = await this.authService.validateUser(userLoginDto);
        const token = await this.authService.createAccessTokenOTP({
            userId: userEntity.id,
            role: userEntity.role,
            user: userEntity.toDto(),
        });
        return new LoginPayloadDto_1.LoginPayloadDto(userEntity.toDto(), token);
    }
    async userLoginOTP(otp, token, res) {
        const user = await this.authService.validateUserOTP(otp, token);
        const accessToken = await this.authService.createAccessToken({
            userId: user.id,
            role: user.role,
        });
        return res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Login Successfully",
            data: { user, token: accessToken },
        });
    }
    async userRegister(userRegisterDto, file) {
        const createdUser = await this.userService.createUser(userRegisterDto, file);
        return createdUser.toDto({
            isActive: true,
        });
    }
    async developerRegister(userRegisterDto, res) {
        try {
            console.log('Developer registration request received with payload:', JSON.stringify(userRegisterDto));
            if (!userRegisterDto.email || !userRegisterDto.password) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Email and password are required fields',
                });
            }
            if (userRegisterDto.role &&
                userRegisterDto.role !== constants_1.RoleType.AGENT &&
                userRegisterDto.role !== constants_1.RoleType.DEVELOPER) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Invalid role. Role must be either AGENT or DEVELOPER',
                });
            }
            if (!userRegisterDto.role) {
                userRegisterDto.role = constants_1.RoleType.DEVELOPER;
            }
            console.log(`Attempting to create ${userRegisterDto.role} with email: ${userRegisterDto.email}`);
            const createdUser = await this.userService.createDeveloper(userRegisterDto);
            console.log('User created successfully:', createdUser.id);
            return res.status(common_1.HttpStatus.OK).json({
                statusCode: common_1.HttpStatus.OK,
                message: `${userRegisterDto.role} successfully registered`,
                data: createdUser.toDto({
                    isActive: true,
                }),
            });
        }
        catch (error) {
            console.error('Error in developer registration:', error);
            console.error('Error details:', error.stack);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'Internal server error during registration',
                error: error.stack,
            });
        }
    }
    getCurrentUser(user) {
        return user.toDto();
    }
    async changePassword(user, changePasswordDto, res) {
        return res.status(common_1.HttpStatus.OK).json({
            statusCode: common_1.HttpStatus.OK,
            message: "Password changed successfully",
            data: await this.authService.changePassword(user, changePasswordDto.currentPassword, changePasswordDto.newPassword),
        });
    }
    async forgotPassword(forgotPasswordDto) {
        await this.authService.sendForgotPasswordEmail(forgotPasswordDto.email);
    }
};
__decorate([
    (0, common_1.Post)("login"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({
        type: LoginPayloadDto_1.LoginPayloadDto,
        description: "User info with access token",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserLoginDto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userLogin", null);
__decorate([
    (0, common_1.Post)("login/:otp/:token"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({
        type: LoginPayloadDto_1.LoginPayloadDto,
        description: "User info with access token",
    }),
    __param(0, (0, common_1.Param)("otp")),
    __param(1, (0, common_1.Param)("token")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userLoginOTP", null);
__decorate([
    (0, common_1.Post)("register"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ type: user_dto_1.UserDto, description: "Successfully Registered" }),
    (0, decorators_1.ApiFile)({ name: "avatar" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserRegisterDto_1.UserRegisterDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userRegister", null);
__decorate([
    (0, common_1.Post)("developer"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ type: user_dto_1.UserDto, description: "Successfully Registered" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserRegisterDto_1.UserRegisterDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "developerRegister", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Get)("me"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.Auth)([constants_1.RoleType.USER, constants_1.RoleType.ADMIN, constants_1.RoleType.AGENT, constants_1.RoleType.DEVELOPER]),
    (0, swagger_1.ApiOkResponse)({ type: user_dto_1.UserDto, description: "current user info" }),
    __param(0, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", user_dto_1.UserDto)
], AuthController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Post)("change-password"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.Auth)([constants_1.RoleType.USER, constants_1.RoleType.ADMIN, constants_1.RoleType.AGENT, constants_1.RoleType.DEVELOPER]),
    (0, swagger_1.ApiOkResponse)({ type: user_dto_1.UserDto, description: "current user info" }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        change_password_dto_1.ChangePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("forgot-password"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    (0, swagger_1.ApiTags)("auth"),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map