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
exports.UserKYCDto = void 0;
const abstract_dto_1 = require("../../../common/dto/abstract.dto");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../user/user.entity");
class UserKYCDto extends abstract_dto_1.AbstractDto {
    constructor(entity) {
        super(entity);
        this.firstName = entity.firstName;
        this.lastName = entity.lastName;
        this.email = entity.email;
        this.address = entity.address;
        this.street = entity.street;
        this.state = entity.state;
        this.postalCode = entity.postalCode;
        this.mobileNumber = entity.mobileNumber;
        this.company = entity.company;
        this.pubkey = entity.pubkey;
        this.certificates = entity.certificates;
        this.passportImage = entity.passportImage;
        this.nicFrontImage = entity.nicFrontImage;
        this.nicBackImage = entity.nicBackImage;
        this.signatureImage = entity.signatureImage;
        this.isPassport = entity.isPassport;
        this.experience = entity.experience;
        this.sourceOfIncome = entity.sourceOfIncome;
        this.riskProfile = entity.riskProfile;
        this.userId = entity.userId;
        this.user = entity.user;
        this.status = entity.status;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserKYCDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserKYCDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserKYCDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserKYCDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserKYCDto.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserKYCDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserKYCDto.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserKYCDto.prototype, "mobileNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserKYCDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserKYCDto.prototype, "pubkey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserKYCDto.prototype, "certificates", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserKYCDto.prototype, "passportImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserKYCDto.prototype, "nicFrontImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserKYCDto.prototype, "nicBackImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserKYCDto.prototype, "signatureImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], UserKYCDto.prototype, "isPassport", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserKYCDto.prototype, "experience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserKYCDto.prototype, "sourceOfIncome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserKYCDto.prototype, "riskProfile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserKYCDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ["pending", "approved", "rejected"] }),
    __metadata("design:type", String)
], UserKYCDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.UserEntity }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserKYCDto.prototype, "user", void 0);
exports.UserKYCDto = UserKYCDto;
//# sourceMappingURL=user-kyc.dto.js.map