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
exports.AgentLandDto = void 0;
const abstract_dto_1 = require("../../../common/dto/abstract.dto");
const swagger_1 = require("@nestjs/swagger");
const land_status_1 = require("../../../constants/land-status");
const user_entity_1 = require("../../user/user.entity");
const project_entity_1 = require("../../project/entities/project.entity");
const type_entity_1 = require("../../type/entities/type.entity");
const currency_entity_1 = require("../../currency/entities/currency.entity");
const category_entity_1 = require("../../category/entities/category.entity");
class AgentLandDto extends abstract_dto_1.AbstractDto {
    constructor(entity) {
        super(entity);
        this.tokenId = entity.tokenId;
        this.typeId = entity.typeId;
        this.agentId = entity.agentId;
        this.projectId = entity.projectId;
        this.developerId = entity.developerId;
        this.status = entity.status;
        this.user = entity.user;
        this.project = entity.project;
        this.type = entity.type;
        this.landImage = entity.landImage;
        this.youtubeLinks = entity.youtubeLinks;
        this.currency = entity.project.currency;
        this.category = entity.project.category;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AgentLandDto.prototype, "tokenId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AgentLandDto.prototype, "typeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AgentLandDto.prototype, "agentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AgentLandDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AgentLandDto.prototype, "developerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], AgentLandDto.prototype, "youtubeLinks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], AgentLandDto.prototype, "landImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: land_status_1.LandStatus }),
    __metadata("design:type", String)
], AgentLandDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.UserEntity }),
    __metadata("design:type", user_entity_1.UserEntity)
], AgentLandDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => project_entity_1.ProjectEntity }),
    __metadata("design:type", project_entity_1.ProjectEntity)
], AgentLandDto.prototype, "project", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => type_entity_1.TypeEntity }),
    __metadata("design:type", type_entity_1.TypeEntity)
], AgentLandDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => currency_entity_1.CurrencyEntity }),
    __metadata("design:type", currency_entity_1.CurrencyEntity)
], AgentLandDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => category_entity_1.CategoryEntity }),
    __metadata("design:type", category_entity_1.CategoryEntity)
], AgentLandDto.prototype, "category", void 0);
exports.AgentLandDto = AgentLandDto;
//# sourceMappingURL=agent-land.dto.js.map