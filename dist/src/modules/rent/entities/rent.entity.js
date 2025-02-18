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
exports.RentEntity = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../common/abstract.entity");
const decorators_1 = require("../../../decorators");
const rent_dto_1 = require("../dto/rent.dto");
const project_entity_1 = require("../../project/entities/project.entity");
const agent_land_entity_1 = require("../../agent-land/entities/agent-land.entity");
const user_entity_1 = require("../../user/user.entity");
const currency_entity_1 = require("../../currency/entities/currency.entity");
let RentEntity = class RentEntity extends abstract_entity_1.AbstractEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RentEntity.prototype, "tokenId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RentEntity.prototype, "rentAmount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RentEntity.prototype, "securityAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], RentEntity.prototype, "isAcceptByTenant", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], RentEntity.prototype, "requestForBack", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], RentEntity.prototype, "isOnchain", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RentEntity.prototype, "lastPaymentTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RentEntity.prototype, "currentPaymentTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RentEntity.prototype, "acceptRentTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RentEntity.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], RentEntity.prototype, "isVacationRent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], RentEntity.prototype, "currencyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "uuid" }),
    __metadata("design:type", String)
], RentEntity.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], RentEntity.prototype, "ownerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], RentEntity.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], RentEntity.prototype, "agentLandId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (tenant) => tenant.rent),
    (0, typeorm_1.JoinColumn)({ name: "tenant_id" }),
    __metadata("design:type", user_entity_1.UserEntity)
], RentEntity.prototype, "tenant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (owner) => owner.rent),
    (0, typeorm_1.JoinColumn)({ name: "owner_id" }),
    __metadata("design:type", user_entity_1.UserEntity)
], RentEntity.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.ProjectEntity, (project) => project.trade),
    (0, typeorm_1.JoinColumn)({ name: "project_id" }),
    __metadata("design:type", project_entity_1.ProjectEntity)
], RentEntity.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => agent_land_entity_1.AgentLandEntity, (agentLand) => agentLand.trade),
    (0, typeorm_1.JoinColumn)({ name: "agent_land_id" }),
    __metadata("design:type", agent_land_entity_1.AgentLandEntity)
], RentEntity.prototype, "agentLand", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => currency_entity_1.CurrencyEntity, (currency) => currency.rent),
    (0, typeorm_1.JoinColumn)({ name: "currency_id" }),
    __metadata("design:type", currency_entity_1.CurrencyEntity)
], RentEntity.prototype, "currency", void 0);
RentEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "rent" }),
    (0, decorators_1.UseDto)(rent_dto_1.RentDto)
], RentEntity);
exports.RentEntity = RentEntity;
//# sourceMappingURL=rent.entity.js.map