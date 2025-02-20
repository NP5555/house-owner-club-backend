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
exports.CreateRentDto = void 0;
const decorators_1 = require("../../../decorators");
class CreateRentDto {
}
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateRentDto.prototype, "tokenId", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateRentDto.prototype, "rentAmount", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateRentDto.prototype, "securityAmount", void 0);
__decorate([
    (0, decorators_1.BooleanFieldOptional)({ default: false }),
    __metadata("design:type", Boolean)
], CreateRentDto.prototype, "isAcceptByTenant", void 0);
__decorate([
    (0, decorators_1.BooleanFieldOptional)({ default: false }),
    __metadata("design:type", Boolean)
], CreateRentDto.prototype, "requestForBack", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateRentDto.prototype, "lastPaymentTime", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateRentDto.prototype, "duration", void 0);
__decorate([
    (0, decorators_1.BooleanField)(),
    __metadata("design:type", Boolean)
], CreateRentDto.prototype, "isVacationRent", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateRentDto.prototype, "currencyId", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], CreateRentDto.prototype, "tenantId", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateRentDto.prototype, "ownerId", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateRentDto.prototype, "projectId", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateRentDto.prototype, "agentLandId", void 0);
__decorate([
    (0, decorators_1.BooleanFieldOptional)({ default: false }),
    __metadata("design:type", Boolean)
], CreateRentDto.prototype, "isOnchain", void 0);
exports.CreateRentDto = CreateRentDto;
//# sourceMappingURL=create-rent.dto.js.map