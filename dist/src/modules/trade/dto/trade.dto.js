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
exports.TradeDto = void 0;
const abstract_dto_1 = require("../../../common/dto/abstract.dto");
const swagger_1 = require("@nestjs/swagger");
const project_entity_1 = require("../../project/entities/project.entity");
const type_entity_1 = require("../../type/entities/type.entity");
const agent_land_entity_1 = require("../../agent-land/entities/agent-land.entity");
const user_entity_1 = require("../../user/user.entity");
class TradeDto extends abstract_dto_1.AbstractDto {
    constructor(entity) {
        super(entity);
        this.signatureTime = entity.signatureTime;
        this.signatures = entity.signatures;
        this.bidTime = entity.bidTime;
        this.price = entity.price;
        this.isSigned = entity.isSigned;
        this.isListed = entity.isListed;
        this.isSold = entity.isSold;
        this.isAuction = entity.isAuction;
        this.isAllInstallmentPaid = entity.isAllInstallmentPaid;
        this.isTradeInitiated = entity.isTradeInitiated;
        this.tokenId = entity.tokenId;
        this.buyerId = entity.buyerId;
        this.buyId = entity.buyId;
        this.agentLandId = entity.agentLandId;
        this.agentLand = entity.agentLand;
        this.userid = entity.userId;
        this.user = entity.user;
        this.typeId = entity.typeId;
        this.type = entity.type;
        this.projectId = entity.projectId;
        this.project = entity.project;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TradeDto.prototype, "tokenId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TradeDto.prototype, "userid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TradeDto.prototype, "typeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TradeDto.prototype, "buyerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TradeDto.prototype, "buyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TradeDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TradeDto.prototype, "agentLandId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TradeDto.prototype, "signatureTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TradeDto.prototype, "signatures", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TradeDto.prototype, "bidTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TradeDto.prototype, "highestBidder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TradeDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], TradeDto.prototype, "isSigned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], TradeDto.prototype, "isListed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], TradeDto.prototype, "isTradeInitiated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], TradeDto.prototype, "isSold", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], TradeDto.prototype, "isAuction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], TradeDto.prototype, "isAllInstallmentPaid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => project_entity_1.ProjectEntity }),
    __metadata("design:type", project_entity_1.ProjectEntity)
], TradeDto.prototype, "project", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => agent_land_entity_1.AgentLandEntity }),
    __metadata("design:type", agent_land_entity_1.AgentLandEntity)
], TradeDto.prototype, "agentLand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.UserEntity }),
    __metadata("design:type", user_entity_1.UserEntity)
], TradeDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => type_entity_1.TypeEntity }),
    __metadata("design:type", type_entity_1.TypeEntity)
], TradeDto.prototype, "type", void 0);
exports.TradeDto = TradeDto;
//# sourceMappingURL=trade.dto.js.map