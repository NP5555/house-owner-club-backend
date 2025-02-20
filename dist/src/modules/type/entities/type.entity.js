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
exports.TypeEntity = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../common/abstract.entity");
const decorators_1 = require("../../../decorators");
const type_dto_1 = require("../dto/type.dto");
const project_entity_1 = require("../../project/entities/project.entity");
const agent_land_entity_1 = require("../../agent-land/entities/agent-land.entity");
const buy_entity_1 = require("../../buy/entities/buy.entity");
const trade_entity_1 = require("../../trade/entities/trade.entity");
let TypeEntity = class TypeEntity extends abstract_entity_1.AbstractEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TypeEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], TypeEntity.prototype, "blockchainId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TypeEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], TypeEntity.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.ProjectEntity, (project) => project.types),
    (0, typeorm_1.JoinColumn)({ name: "project_id" }),
    __metadata("design:type", project_entity_1.ProjectEntity)
], TypeEntity.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => agent_land_entity_1.AgentLandEntity, (typeEn) => typeEn.type),
    __metadata("design:type", Array)
], TypeEntity.prototype, "agentLands", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => buy_entity_1.BuyEntity, (buyEn) => buyEn.type),
    __metadata("design:type", Array)
], TypeEntity.prototype, "buys", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => trade_entity_1.TradeEntity, (buyEn) => buyEn.type),
    __metadata("design:type", Array)
], TypeEntity.prototype, "trade", void 0);
TypeEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "types" }),
    (0, decorators_1.UseDto)(type_dto_1.TypeDto)
], TypeEntity);
exports.TypeEntity = TypeEntity;
//# sourceMappingURL=type.entity.js.map