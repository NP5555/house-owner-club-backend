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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentLandEntity = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../common/abstract.entity");
const decorators_1 = require("../../../decorators");
const agent_land_dto_1 = require("../dto/agent-land.dto");
const project_entity_1 = require("../../project/entities/project.entity");
const type_entity_1 = require("../../type/entities/type.entity");
const land_status_1 = require("../../../constants/land-status");
const user_entity_1 = require("../../user/user.entity");
const buy_entity_1 = require("../../buy/entities/buy.entity");
const trade_entity_1 = require("../../trade/entities/trade.entity");
let AgentLandEntity = class AgentLandEntity extends abstract_entity_1.AbstractEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AgentLandEntity.prototype, "tokenId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], AgentLandEntity.prototype, "typeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], AgentLandEntity.prototype, "developerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], AgentLandEntity.prototype, "agentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], AgentLandEntity.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "simple-array", nullable: true }),
    __metadata("design:type", Array)
], AgentLandEntity.prototype, "youtubeLinks", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "simple-array", nullable: true }),
    __metadata("design:type", Array)
], AgentLandEntity.prototype, "landImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: land_status_1.LandStatus, default: land_status_1.LandStatus.UNSOLD }),
    __metadata("design:type", String)
], AgentLandEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.ProjectEntity, (project) => project.agentLands),
    (0, typeorm_1.JoinColumn)({ name: "project_id" }),
    __metadata("design:type", project_entity_1.ProjectEntity)
], AgentLandEntity.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => type_entity_1.TypeEntity, (t) => t.agentLands),
    (0, typeorm_1.JoinColumn)({ name: "type_id" }),
    __metadata("design:type", type_entity_1.TypeEntity)
], AgentLandEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (userEntity) => userEntity.agentLands, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "agent_id" }),
    __metadata("design:type", user_entity_1.UserEntity)
], AgentLandEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (userEntity) => userEntity.agentLands, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "developer_id" }),
    __metadata("design:type", user_entity_1.UserEntity)
], AgentLandEntity.prototype, "developer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => buy_entity_1.BuyEntity, (buyEn) => buyEn.agentLand),
    __metadata("design:type", Array)
], AgentLandEntity.prototype, "buys", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => trade_entity_1.TradeEntity, (buyEn) => buyEn.agentLand),
    __metadata("design:type", Array)
], AgentLandEntity.prototype, "trade", void 0);
AgentLandEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "agent_land" }),
    (0, decorators_1.UseDto)(agent_land_dto_1.AgentLandDto)
], AgentLandEntity);
exports.AgentLandEntity = AgentLandEntity;
//# sourceMappingURL=agent-land.entity.js.map