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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const page_dto_1 = require("../../common/dto/page.dto");
const constants_1 = require("../../constants");
const decorators_1 = require("../../decorators");
const language_interceptor_service_1 = require("../../interceptors/language-interceptor.service");
const translation_service_1 = require("../../shared/services/translation.service");
const update_role_dto_1 = require("./dtos/update-role.dto");
const user_dto_1 = require("./dtos/user.dto");
const users_page_options_dto_1 = require("./dtos/users-page-options.dto");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
const update_status_dto_1 = require("./dtos/update-status.dto");
let UserController = class UserController {
    constructor(userService, translationService) {
        this.userService = userService;
        this.translationService = translationService;
    }
    async admin(user) {
        const translation = await this.translationService.translate("admin.keywords.admin");
        return {
            text: `${translation} ${user.firstName}`,
        };
    }
    async getUsers(pageOptionsDto, res) {
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Record Found",
            data: await this.userService.getUsers(pageOptionsDto),
        });
        return this.userService.getUsers(pageOptionsDto);
    }
    async getDevelopers(pageOptionsDto, res) {
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Record Found",
            data: await this.userService.getDevelopers(pageOptionsDto),
        });
        return this.userService.getUsers(pageOptionsDto);
    }
    async getAgents(pageOptionsDto, res) {
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Record Found",
            data: await this.userService.getAgents(pageOptionsDto),
        });
        return this.userService.getAgents(pageOptionsDto);
    }
    getUsersReferredBy(pageOptionsDto, user) {
        return this.userService.getUsersReferredBy(pageOptionsDto, user);
    }
    getUser(userId) {
        return this.userService.getUser(userId);
    }
    async updateUserRoleById(u) {
        return this.userService.updateRole(u.id, u.role);
    }
    async updateUserStatusById(u, res) {
        const updataActive = await this.userService.updateStatus(u.id, u.isActive);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Record updated",
            data: updataActive,
        });
        return this.userService.updateStatus(u.id, u.isActive);
    }
};
__decorate([
    (0, common_1.Get)("admin"),
    (0, decorators_1.Auth)([constants_1.RoleType.USER, constants_1.RoleType.ADMIN]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, language_interceptor_service_1.UseLanguageInterceptor)(),
    __param(0, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "admin", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get users list",
        type: page_dto_1.PageDto,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_page_options_dto_1.UsersPageOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)("developer"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get developer list",
        type: page_dto_1.PageDto,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_page_options_dto_1.UsersPageOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getDevelopers", null);
__decorate([
    (0, common_1.Get)("agent"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get developer list",
        type: page_dto_1.PageDto,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_page_options_dto_1.UsersPageOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAgents", null);
__decorate([
    (0, common_1.Get)("referredBy"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get users list referredBy",
        type: page_dto_1.PageDto,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_page_options_dto_1.UsersPageOptionsDto,
        user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsersReferredBy", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get users list",
        type: user_dto_1.UserDto,
    }),
    __param(0, (0, decorators_1.UUIDParam)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)("updateRole"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Update role",
        type: user_dto_1.UserDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_role_dto_1.UpdateRoleDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserRoleById", null);
__decorate([
    (0, common_1.Post)("updateStatus"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Update status",
        type: user_dto_1.UserDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_status_dto_1.UpdateStatusDTO, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserStatusById", null);
UserController = __decorate([
    (0, common_1.Controller)("users"),
    (0, swagger_1.ApiTags)("users"),
    __metadata("design:paramtypes", [user_service_1.UserService,
        translation_service_1.TranslationService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map