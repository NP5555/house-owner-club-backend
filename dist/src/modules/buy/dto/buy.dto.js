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
exports.BuyDto = void 0;
const abstract_dto_1 = require("../../../common/dto/abstract.dto");
const swagger_1 = require("@nestjs/swagger");
const project_entity_1 = require("../../project/entities/project.entity");
const type_entity_1 = require("../../type/entities/type.entity");
const agent_land_entity_1 = require("../../agent-land/entities/agent-land.entity");
const user_entity_1 = require("../../user/user.entity");
class BuyDto extends abstract_dto_1.AbstractDto {
    constructor(entity) {
        super(entity);
        this.wallet = entity.wallet;
        this.tokenId = entity.tokenId;
        this.agentWallet = entity.agentWallet;
        this.agentLandId = entity.agentLandId;
        this.agentLand = entity.agentLand;
        this.typeId = entity.typeId;
        this.userid = entity.userId;
        this.type = entity.type;
        this.projectId = entity.projectId;
        this.signatureTime = entity.signatureTime;
        this.signatures = entity.signatures;
        this.isSigned = entity.isSigned;
        this.isSold = entity.isSold;
        this.updateInstallment = entity.updateInstallment;
        this.project = entity.project;
        this.user = entity.user;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BuyDto.prototype, "wallet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BuyDto.prototype, "tokenId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BuyDto.prototype, "typeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BuyDto.prototype, "userid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BuyDto.prototype, "buyerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BuyDto.prototype, "agentWallet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BuyDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BuyDto.prototype, "agentLandId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BuyDto.prototype, "signatureTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BuyDto.prototype, "signatures", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], BuyDto.prototype, "isSigned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], BuyDto.prototype, "updateInstallment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], BuyDto.prototype, "isSold", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => project_entity_1.ProjectEntity }),
    __metadata("design:type", project_entity_1.ProjectEntity)
], BuyDto.prototype, "project", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => type_entity_1.TypeEntity }),
    __metadata("design:type", type_entity_1.TypeEntity)
], BuyDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => agent_land_entity_1.AgentLandEntity }),
    __metadata("design:type", agent_land_entity_1.AgentLandEntity)
], BuyDto.prototype, "agentLand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.UserEntity }),
    __metadata("design:type", user_entity_1.UserEntity)
], BuyDto.prototype, "user", void 0);
exports.BuyDto = BuyDto;
//# sourceMappingURL=buy.dto.js.map