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
exports.ProjectDto = void 0;
const abstract_dto_1 = require("../../../common/dto/abstract.dto");
const project_status_1 = require("../../../constants/project-status");
const swagger_1 = require("@nestjs/swagger");
const currency_entity_1 = require("../../currency/entities/currency.entity");
const category_entity_1 = require("../../category/entities/category.entity");
const user_entity_1 = require("../../user/user.entity");
class ProjectDto extends abstract_dto_1.AbstractDto {
    constructor(entity) {
        super(entity);
        this.name = entity.name;
        this.price = entity.price;
        this.description = entity.description;
        this.status = entity.status;
        this.nftAddress = entity.nftAddress;
        this.saleAddress = entity.saleAddress;
        this.categoryId = entity.categoryId;
        this.currencyId = entity.currencyId;
        this.developerId = entity.developerId;
        this.developer = entity.developer;
        this.currency = entity.currency;
        this.category = entity.category;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProjectDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProjectDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProjectDto.prototype, "saleAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProjectDto.prototype, "nftAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProjectDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: project_status_1.ProjectStatus }),
    __metadata("design:type", String)
], ProjectDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProjectDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProjectDto.prototype, "currencyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProjectDto.prototype, "developerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: currency_entity_1.CurrencyEntity }),
    __metadata("design:type", currency_entity_1.CurrencyEntity)
], ProjectDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: category_entity_1.CategoryEntity }),
    __metadata("design:type", category_entity_1.CategoryEntity)
], ProjectDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: user_entity_1.UserEntity }),
    __metadata("design:type", user_entity_1.UserEntity)
], ProjectDto.prototype, "developer", void 0);
exports.ProjectDto = ProjectDto;
//# sourceMappingURL=project.dto.js.map