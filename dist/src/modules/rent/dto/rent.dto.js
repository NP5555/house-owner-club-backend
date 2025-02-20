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
exports.RentDto = void 0;
const abstract_dto_1 = require("../../../common/dto/abstract.dto");
const swagger_1 = require("@nestjs/swagger");
const project_entity_1 = require("../../project/entities/project.entity");
const type_entity_1 = require("../../type/entities/type.entity");
const agent_land_entity_1 = require("../../agent-land/entities/agent-land.entity");
const user_entity_1 = require("../../user/user.entity");
const currency_entity_1 = require("../../currency/entities/currency.entity");
class RentDto extends abstract_dto_1.AbstractDto {
    constructor(entity) {
        super(entity);
        this.tokenId = entity.tokenId;
        this.rentAmount = entity.rentAmount;
        this.securityAmount = entity.securityAmount;
        this.isAcceptByTenant = entity.isAcceptByTenant;
        this.requestForBack = entity.requestForBack;
        this.lastPaymentTime = entity.lastPaymentTime;
        this.currentPaymentTime = entity.currentPaymentTime;
        this.acceptRentTime = entity.acceptRentTime;
        this.duration = entity.duration;
        this.isOnchain = entity.isOnchain;
        this.currencyId = entity.currencyId;
        this.currency = entity.currency;
        this.tenantId = entity.tenantId;
        this.tenant = entity.tenant;
        this.ownerId = entity.ownerId;
        this.owner = entity.owner;
        this.projectId = entity.projectId;
        this.project = entity.project;
        this.agentLandId = entity.agentLandId;
        this.agentLand = entity.agentLand;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RentDto.prototype, "tokenId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RentDto.prototype, "rentAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RentDto.prototype, "securityAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], RentDto.prototype, "isAcceptByTenant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], RentDto.prototype, "requestForBack", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RentDto.prototype, "lastPaymentTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RentDto.prototype, "currentPaymentTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RentDto.prototype, "acceptRentTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], RentDto.prototype, "isOnchain", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], RentDto.prototype, "isVacationRent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], RentDto.prototype, "tenantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RentDto.prototype, "ownerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RentDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RentDto.prototype, "agentLandId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RentDto.prototype, "currencyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RentDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => project_entity_1.ProjectEntity }),
    __metadata("design:type", project_entity_1.ProjectEntity)
], RentDto.prototype, "project", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => agent_land_entity_1.AgentLandEntity }),
    __metadata("design:type", agent_land_entity_1.AgentLandEntity)
], RentDto.prototype, "agentLand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.UserEntity }),
    __metadata("design:type", user_entity_1.UserEntity)
], RentDto.prototype, "tenant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.UserEntity }),
    __metadata("design:type", user_entity_1.UserEntity)
], RentDto.prototype, "owner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => type_entity_1.TypeEntity }),
    __metadata("design:type", type_entity_1.TypeEntity)
], RentDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => currency_entity_1.CurrencyEntity }),
    __metadata("design:type", currency_entity_1.CurrencyEntity)
], RentDto.prototype, "currency", void 0);
exports.RentDto = RentDto;
//# sourceMappingURL=rent.dto.js.map