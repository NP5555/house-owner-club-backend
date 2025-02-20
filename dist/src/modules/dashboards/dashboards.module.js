"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDashboardModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dashboards_service_1 = require("./dashboards.service");
const dashboards_controller_1 = require("./dashboards.controller");
const buy_entity_1 = require("../buy/entities/buy.entity");
const trade_entity_1 = require("../trade/entities/trade.entity");
const agent_land_entity_1 = require("../agent-land/entities/agent-land.entity");
const project_entity_1 = require("../project/entities/project.entity");
const user_entity_1 = require("../user/user.entity");
let UserDashboardModule = class UserDashboardModule {
};
UserDashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([buy_entity_1.BuyEntity, trade_entity_1.TradeEntity, agent_land_entity_1.AgentLandEntity, project_entity_1.ProjectEntity, user_entity_1.UserEntity]),
        ],
        controllers: [dashboards_controller_1.UserDashboardController],
        providers: [dashboards_service_1.UserDashboardService],
    })
], UserDashboardModule);
exports.UserDashboardModule = UserDashboardModule;
//# sourceMappingURL=dashboards.module.js.map