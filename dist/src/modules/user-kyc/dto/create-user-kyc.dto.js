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
exports.CreateUserKYCDto = void 0;
const decorators_1 = require("../../../decorators");
class CreateUserKYCDto {
}
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateUserKYCDto.prototype, "firstName", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateUserKYCDto.prototype, "lastName", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateUserKYCDto.prototype, "email", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateUserKYCDto.prototype, "address", void 0);
__decorate([
    (0, decorators_1.StringField)({ required: false }),
    __metadata("design:type", String)
], CreateUserKYCDto.prototype, "street", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateUserKYCDto.prototype, "state", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateUserKYCDto.prototype, "postalCode", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateUserKYCDto.prototype, "mobileNumber", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], CreateUserKYCDto.prototype, "company", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateUserKYCDto.prototype, "pubkey", void 0);
__decorate([
    (0, decorators_1.StringField)({ required: false }),
    __metadata("design:type", String)
], CreateUserKYCDto.prototype, "certificates", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateUserKYCDto.prototype, "passportImage", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateUserKYCDto.prototype, "nicFrontImage", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateUserKYCDto.prototype, "nicBackImage", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateUserKYCDto.prototype, "signatureImage", void 0);
__decorate([
    (0, decorators_1.BooleanField)(),
    __metadata("design:type", Boolean)
], CreateUserKYCDto.prototype, "isPassport", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateUserKYCDto.prototype, "experience", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateUserKYCDto.prototype, "sourceOfIncome", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateUserKYCDto.prototype, "riskProfile", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateUserKYCDto.prototype, "userId", void 0);
exports.CreateUserKYCDto = CreateUserKYCDto;
//# sourceMappingURL=create-user-kyc.dto.js.map