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
exports.UserDashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const buy_entity_1 = require("../buy/entities/buy.entity");
const agent_land_entity_1 = require("../agent-land/entities/agent-land.entity");
const typeorm_2 = require("typeorm");
const trade_entity_1 = require("../trade/entities/trade.entity");
const land_status_1 = require("../../constants/land-status");
const project_entity_1 = require("../project/entities/project.entity");
const user_entity_1 = require("../user/user.entity");
const constants_1 = require("../../constants");
let UserDashboardService = class UserDashboardService {
    constructor(buyRepository, tradeRepository, agentLandRepository, projectRepository, userRepository) {
        this.buyRepository = buyRepository;
        this.tradeRepository = tradeRepository;
        this.agentLandRepository = agentLandRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }
    async getUserDashboard(userid) {
        const totalOwnLands = await this.buyRepository.count({
            where: { userId: userid },
        });
        const totalSignedLands = await this.buyRepository.count({
            where: { userId: userid, isSigned: true },
        });
        const totalRequestedLands = await this.buyRepository.count({
            where: { userId: userid, isSigned: false },
        });
        const totalListedLands = await this.tradeRepository.count({
            where: { userId: userid, isListed: true },
        });
        const resultArray = [
            { label: "Total Own Lands", value: totalOwnLands },
            { label: "Total Signed Lands", value: totalSignedLands },
            { label: "Total Requested Lands", value: totalRequestedLands },
            { label: "Total Listed Lands", value: totalListedLands },
        ];
        return resultArray;
    }
    async getAgentDashboard(userId) {
        const totalLands = await this.agentLandRepository.count();
        const totalSoldLands = await this.agentLandRepository.count({
            where: { status: land_status_1.LandStatus.SOLD },
        });
        const totalInprocessLands = await this.agentLandRepository.count({
            where: { status: land_status_1.LandStatus.IN_PROCESS },
        });
        const totalUnSoldLands = await this.agentLandRepository.count({
            where: { status: land_status_1.LandStatus.UNSOLD },
        });
        const totalSignedLands = await this.buyRepository.count({
            where: { isSigned: true },
        });
        const totalRequestedLands = await this.buyRepository.count({
            where: { isSigned: false },
        });
        const resultArray = [
            { label: "Total Lands", value: totalLands },
            { label: "Unsold Lands", value: totalUnSoldLands },
            { label: "In Process Lands", value: totalInprocessLands },
            { label: "Sold Lands", value: totalSoldLands },
            { label: "Signed Lands", value: totalSignedLands },
            { label: "Request Buy", value: totalRequestedLands },
        ];
        return resultArray;
    }
    async getDeveloperDashboard(userid) {
        const totalLands = await this.agentLandRepository.count({
            where: { agentId: userid },
        });
        const totalSoldLands = await this.agentLandRepository.count({
            where: { agentId: userid, status: land_status_1.LandStatus.SOLD },
        });
        const totalInprocessLands = await this.agentLandRepository.count({
            where: { agentId: userid, status: land_status_1.LandStatus.IN_PROCESS },
        });
        const totalUnSoldLands = await this.agentLandRepository.count({
            where: { agentId: userid, status: land_status_1.LandStatus.UNSOLD },
        });
        const resultArray = [
            { label: "Total Lands", value: totalLands },
            { label: "Unsold Lands", value: totalUnSoldLands },
            { label: "In Process Lands", value: totalInprocessLands },
            { label: "Sold Lands", value: totalSoldLands },
        ];
        return resultArray;
    }
    async getAdminDashboard() {
        const totalLands = await this.agentLandRepository.count();
        const totalSoldLands = await this.agentLandRepository.count({
            where: { status: land_status_1.LandStatus.SOLD },
        });
        const totalInprocessLands = await this.agentLandRepository.count({
            where: { status: land_status_1.LandStatus.IN_PROCESS },
        });
        const totalUnSoldLands = await this.agentLandRepository.count({
            where: { status: land_status_1.LandStatus.UNSOLD },
        });
        const totalProjects = await this.projectRepository.count();
        const totalDevelopers = await this.userRepository.count({
            where: { role: constants_1.RoleType.DEVELOPER },
        });
        const totalActiveDevelopers = await this.userRepository.count({
            where: { role: constants_1.RoleType.DEVELOPER, isActive: true },
        });
        const resultArray = [
            { label: "Total Lands", value: totalLands },
            { label: "Unsold Lands", value: totalUnSoldLands },
            { label: "In Process Lands", value: totalInprocessLands },
            { label: "Sold Lands", value: totalSoldLands },
            { label: "Total Projects", value: totalProjects },
            { label: "Total Developers", value: totalDevelopers },
            { label: "Active Developers", value: totalActiveDevelopers },
        ];
        return resultArray;
    }
};
UserDashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(buy_entity_1.BuyEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(trade_entity_1.TradeEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(agent_land_entity_1.AgentLandEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(project_entity_1.ProjectEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserDashboardService);
exports.UserDashboardService = UserDashboardService;
//# sourceMappingURL=dashboards.service.js.map