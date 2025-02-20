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
exports.CurrencyDto = void 0;
const abstract_dto_1 = require("../../../common/dto/abstract.dto");
const swagger_1 = require("@nestjs/swagger");
class CurrencyDto extends abstract_dto_1.AbstractDto {
    constructor(entity) {
        super(entity);
        this.name = entity.name;
        this.isNative = entity.isNative;
        this.tokenAddress = entity.tokenAddress;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CurrencyDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CurrencyDto.prototype, "isNative", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], CurrencyDto.prototype, "tokenAddress", void 0);
exports.CurrencyDto = CurrencyDto;
//# sourceMappingURL=currency.dto.js.map