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
exports.UserKYCEntity = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../common/abstract.entity");
const decorators_1 = require("../../../decorators");
const user_kyc_dto_1 = require("../dto/user-kyc.dto");
const user_entity_1 = require("../../user/user.entity");
let UserKYCEntity = class UserKYCEntity extends abstract_entity_1.AbstractEntity {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], UserKYCEntity.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], UserKYCEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], UserKYCEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], UserKYCEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserKYCEntity.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], UserKYCEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], UserKYCEntity.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], UserKYCEntity.prototype, "mobileNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserKYCEntity.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserKYCEntity.prototype, "pubkey", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserKYCEntity.prototype, "certificates", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserKYCEntity.prototype, "passportImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserKYCEntity.prototype, "nicFrontImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserKYCEntity.prototype, "nicBackImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], UserKYCEntity.prototype, "signatureImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Boolean)
], UserKYCEntity.prototype, "isPassport", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], UserKYCEntity.prototype, "experience", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], UserKYCEntity.prototype, "sourceOfIncome", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], UserKYCEntity.prototype, "riskProfile", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], UserKYCEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: "pending" }),
    __metadata("design:type", String)
], UserKYCEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, (user) => user.userKYCS, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserKYCEntity.prototype, "user", void 0);
UserKYCEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "user_kyc" }),
    (0, decorators_1.UseDto)(user_kyc_dto_1.UserKYCDto)
], UserKYCEntity);
exports.UserKYCEntity = UserKYCEntity;
//# sourceMappingURL=user-kyc.entity.js.map