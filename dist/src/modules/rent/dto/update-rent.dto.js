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
exports.UpdateRentDto = void 0;
const decorators_1 = require("../../../decorators");
class UpdateRentDto {
}
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateRentDto.prototype, "tokenId", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateRentDto.prototype, "rentAmount", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateRentDto.prototype, "securityAmount", void 0);
__decorate([
    (0, decorators_1.BooleanFieldOptional)(),
    __metadata("design:type", Boolean)
], UpdateRentDto.prototype, "isAcceptByTenant", void 0);
__decorate([
    (0, decorators_1.BooleanFieldOptional)(),
    __metadata("design:type", Boolean)
], UpdateRentDto.prototype, "requestForBack", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateRentDto.prototype, "lastPaymentTime", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateRentDto.prototype, "currentPaymentTime", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateRentDto.prototype, "acceptRentTime", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateRentDto.prototype, "duration", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateRentDto.prototype, "transactionHash", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateRentDto.prototype, "tag", void 0);
__decorate([
    (0, decorators_1.BooleanFieldOptional)(),
    __metadata("design:type", Boolean)
], UpdateRentDto.prototype, "isOnchain", void 0);
__decorate([
    (0, decorators_1.BooleanFieldOptional)(),
    __metadata("design:type", Boolean)
], UpdateRentDto.prototype, "isVacationRent", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateRentDto.prototype, "currencyId", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateRentDto.prototype, "tenantId", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateRentDto.prototype, "ownerId", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateRentDto.prototype, "projectId", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateRentDto.prototype, "agentLandId", void 0);
exports.UpdateRentDto = UpdateRentDto;
//# sourceMappingURL=update-rent.dto.js.map