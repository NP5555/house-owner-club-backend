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
exports.UserDashboardController = void 0;
const common_1 = require("@nestjs/common");
const dashboards_service_1 = require("./dashboards.service");
const swagger_1 = require("@nestjs/swagger");
let UserDashboardController = class UserDashboardController {
    constructor(service) {
        this.service = service;
    }
    async findByUserId(userId, res) {
        const ownLands = await this.service.getUserDashboard(userId);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Records Found",
            data: ownLands,
        });
        return ownLands;
    }
    async adminDashboard(res) {
        const adminDashboard = await this.service.getAdminDashboard();
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Records Found",
            data: adminDashboard,
        });
        return adminDashboard;
    }
    async findByAgentId(userId, res) {
        const landsData = await this.service.getAgentDashboard(userId);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Records Found",
            data: landsData,
        });
        return landsData;
    }
    async findAll(res, developerId) {
        const landsData = await this.service.getDeveloperDashboard(developerId);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Records Found",
            data: landsData,
        });
        return landsData;
    }
};
__decorate([
    (0, common_1.Get)("/"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "User Dashboard",
        isArray: true,
    }),
    __param(0, (0, common_1.Query)("userId")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserDashboardController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.Get)("/admin"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Admin Dashboard",
        isArray: true,
    }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserDashboardController.prototype, "adminDashboard", null);
__decorate([
    (0, common_1.Get)("/agent"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Agent Dashboard",
        isArray: true,
    }),
    __param(0, (0, common_1.Query)("userId")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserDashboardController.prototype, "findByAgentId", null);
__decorate([
    (0, common_1.Get)("/developer"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Agent Dashboard",
        isArray: true,
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)("developerId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserDashboardController.prototype, "findAll", null);
UserDashboardController = __decorate([
    (0, common_1.Controller)("dashboard"),
    (0, swagger_1.ApiTags)("dashboard"),
    __metadata("design:paramtypes", [dashboards_service_1.UserDashboardService])
], UserDashboardController);
exports.UserDashboardController = UserDashboardController;
//# sourceMappingURL=dashboards.controller.js.map