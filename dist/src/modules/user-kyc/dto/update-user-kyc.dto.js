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
exports.UpdateUserKYCDto = void 0;
const decorators_1 = require("../../../decorators");
class UpdateUserKYCDto {
}
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateUserKYCDto.prototype, "firstName", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateUserKYCDto.prototype, "lastName", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateUserKYCDto.prototype, "email", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateUserKYCDto.prototype, "address", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateUserKYCDto.prototype, "street", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateUserKYCDto.prototype, "state", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateUserKYCDto.prototype, "postalCode", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateUserKYCDto.prototype, "mobileNumber", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateUserKYCDto.prototype, "company", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateUserKYCDto.prototype, "pubkey", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateUserKYCDto.prototype, "certificates", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateUserKYCDto.prototype, "passportImage", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateUserKYCDto.prototype, "nicFrontImage", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateUserKYCDto.prototype, "nicBackImage", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateUserKYCDto.prototype, "signatureImage", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)({ enum: ["pending", "approved", "rejected"] }),
    __metadata("design:type", String)
], UpdateUserKYCDto.prototype, "status", void 0);
__decorate([
    (0, decorators_1.BooleanFieldOptional)(),
    __metadata("design:type", Boolean)
], UpdateUserKYCDto.prototype, "isPassport", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateUserKYCDto.prototype, "experience", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateUserKYCDto.prototype, "sourceOfIncome", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateUserKYCDto.prototype, "riskProfile", void 0);
exports.UpdateUserKYCDto = UpdateUserKYCDto;
//# sourceMappingURL=update-user-kyc.dto.js.map