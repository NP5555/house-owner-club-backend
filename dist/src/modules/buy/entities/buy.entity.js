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
exports.BuyEntity = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../common/abstract.entity");
const decorators_1 = require("../../../decorators");
const buy_dto_1 = require("../dto/buy.dto");
const project_entity_1 = require("../../project/entities/project.entity");
const type_entity_1 = require("../../type/entities/type.entity");
const agent_land_entity_1 = require("../../agent-land/entities/agent-land.entity");
const user_entity_1 = require("../../user/user.entity");
let BuyEntity = class BuyEntity extends abstract_entity_1.AbstractEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BuyEntity.prototype, "wallet", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BuyEntity.prototype, "tokenId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], BuyEntity.prototype, "typeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], BuyEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "uuid" }),
    __metadata("design:type", String)
], BuyEntity.prototype, "buyerId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BuyEntity.prototype, "agentWallet", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], BuyEntity.prototype, "agentLandId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], BuyEntity.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BuyEntity.prototype, "signatureTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BuyEntity.prototype, "signatures", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false, nullable: true }),
    __metadata("design:type", Boolean)
], BuyEntity.prototype, "isSigned", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], BuyEntity.prototype, "updateInstallment", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false, nullable: true }),
    __metadata("design:type", Boolean)
], BuyEntity.prototype, "isSold", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.ProjectEntity, (project) => project.buys),
    (0, typeorm_1.JoinColumn)({ name: "project_id" }),
    __metadata("design:type", project_entity_1.ProjectEntity)
], BuyEntity.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => type_entity_1.TypeEntity, (type) => type.buys),
    (0, typeorm_1.JoinColumn)({ name: "type_id" }),
    __metadata("design:type", type_entity_1.TypeEntity)
], BuyEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.buys),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.UserEntity)
], BuyEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => agent_land_entity_1.AgentLandEntity, (agentLand) => agentLand.buys),
    (0, typeorm_1.JoinColumn)({ name: "agent_land_id" }),
    __metadata("design:type", agent_land_entity_1.AgentLandEntity)
], BuyEntity.prototype, "agentLand", void 0);
BuyEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "buys" }),
    (0, decorators_1.UseDto)(buy_dto_1.BuyDto)
], BuyEntity);
exports.BuyEntity = BuyEntity;
//# sourceMappingURL=buy.entity.js.map