"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentLandModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const agent_land_service_1 = require("./agent-land.service");
const agent_land_controller_1 = require("./agent-land.controller");
const agent_land_entity_1 = require("./entities/agent-land.entity");
const project_entity_1 = require("../project/entities/project.entity");
const user_entity_1 = require("../user/user.entity");
let AgentLandModule = class AgentLandModule {
};
AgentLandModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([project_entity_1.ProjectEntity, agent_land_entity_1.AgentLandEntity, user_entity_1.UserEntity]),
        ],
        controllers: [agent_land_controller_1.AgentLandController],
        providers: [agent_land_service_1.AgentLandService],
    })
], AgentLandModule);
exports.AgentLandModule = AgentLandModule;
//# sourceMappingURL=agent-land.module.js.map