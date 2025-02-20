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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../common/abstract.entity");
const constants_1 = require("../../constants");
const decorators_1 = require("../../decorators");
const user_dto_1 = require("./dtos/user.dto");
const user_kyc_entity_1 = require("../user-kyc/entities/user-kyc.entity");
const agent_land_entity_1 = require("../agent-land/entities/agent-land.entity");
const documents_entity_1 = require("../userDocuments/entities/documents.entity");
const documentCatalogue_entity_1 = require("../documentCatalogue/entities/documentCatalogue.entity");
const buy_entity_1 = require("../buy/entities/buy.entity");
const trade_entity_1 = require("../trade/entities/trade.entity");
const rent_entity_1 = require("../rent/entities/rent.entity");
const project_entity_1 = require("../project/entities/project.entity");
let UserEntity = class UserEntity extends abstract_entity_1.AbstractEntity {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: constants_1.RoleType, default: constants_1.RoleType.USER }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "avatar", void 0);
__decorate([
    (0, decorators_1.VirtualColumn)(),
    __metadata("design:type", String)
], UserEntity.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isKYC", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "wallet", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "referralCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "referredBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], UserEntity.prototype, "otp", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => agent_land_entity_1.AgentLandEntity, (aEn) => aEn.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "agentLands", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => documentCatalogue_entity_1.DocumentCatalogueEntity, (dc) => dc.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "documentCatalogue", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_entity_1.ProjectEntity, (aEn) => aEn.developer),
    __metadata("design:type", Array)
], UserEntity.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => documents_entity_1.DocumentEntity, (aEn) => aEn.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => buy_entity_1.BuyEntity, (aEn) => aEn.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "buys", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => trade_entity_1.TradeEntity, (aEn) => aEn.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "trade", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rent_entity_1.RentEntity, (aEn) => {
        aEn.tenant, aEn.owner;
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "rent", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_kyc_entity_1.UserKYCEntity, (userKYC) => userKYC.user),
    __metadata("design:type", user_kyc_entity_1.UserKYCEntity)
], UserEntity.prototype, "userKYCS", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "users" }),
    (0, decorators_1.UseDto)(user_dto_1.UserDto)
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map