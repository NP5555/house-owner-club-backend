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
exports.CurrencyEntity = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../common/abstract.entity");
const decorators_1 = require("../../../decorators");
const currency_dto_1 = require("../dto/currency.dto");
const project_entity_1 = require("../../project/entities/project.entity");
const rent_entity_1 = require("../../rent/entities/rent.entity");
let CurrencyEntity = class CurrencyEntity extends abstract_entity_1.AbstractEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CurrencyEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], CurrencyEntity.prototype, "isNative", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CurrencyEntity.prototype, "tokenAddress", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_entity_1.ProjectEntity, (projectEn) => projectEn.currency),
    __metadata("design:type", Array)
], CurrencyEntity.prototype, "projects", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rent_entity_1.RentEntity, (rentEn) => rentEn.currency),
    __metadata("design:type", Array)
], CurrencyEntity.prototype, "rent", void 0);
CurrencyEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "currency" }),
    (0, decorators_1.UseDto)(currency_dto_1.CurrencyDto)
], CurrencyEntity);
exports.CurrencyEntity = CurrencyEntity;
//# sourceMappingURL=currency.entity.js.map