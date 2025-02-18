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
exports.UpdateTradeDto = void 0;
const decorators_1 = require("../../../decorators");
class UpdateTradeDto {
}
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateTradeDto.prototype, "signatures", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateTradeDto.prototype, "signatureTime", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateTradeDto.prototype, "userId", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateTradeDto.prototype, "buyerId", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateTradeDto.prototype, "buyId", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateTradeDto.prototype, "bidTime", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateTradeDto.prototype, "price", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateTradeDto.prototype, "transactionHash", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateTradeDto.prototype, "tag", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateTradeDto.prototype, "highestBidder", void 0);
__decorate([
    (0, decorators_1.BooleanFieldOptional)(),
    __metadata("design:type", Boolean)
], UpdateTradeDto.prototype, "isSigned", void 0);
__decorate([
    (0, decorators_1.BooleanFieldOptional)(),
    __metadata("design:type", Boolean)
], UpdateTradeDto.prototype, "isListed", void 0);
__decorate([
    (0, decorators_1.BooleanFieldOptional)(),
    __metadata("design:type", Boolean)
], UpdateTradeDto.prototype, "isTradeInitiated", void 0);
__decorate([
    (0, decorators_1.BooleanFieldOptional)(),
    __metadata("design:type", Boolean)
], UpdateTradeDto.prototype, "isSold", void 0);
__decorate([
    (0, decorators_1.BooleanFieldOptional)(),
    __metadata("design:type", Boolean)
], UpdateTradeDto.prototype, "isAuction", void 0);
__decorate([
    (0, decorators_1.BooleanFieldOptional)(),
    __metadata("design:type", Boolean)
], UpdateTradeDto.prototype, "isAllInstallmentPaid", void 0);
exports.UpdateTradeDto = UpdateTradeDto;
//# sourceMappingURL=update-trade.dto.js.map