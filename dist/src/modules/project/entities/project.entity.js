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
exports.ProjectEntity = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../common/abstract.entity");
const decorators_1 = require("../../../decorators");
const project_dto_1 = require("../dto/project.dto");
const project_status_1 = require("../../../constants/project-status");
const category_entity_1 = require("../../category/entities/category.entity");
const currency_entity_1 = require("../../currency/entities/currency.entity");
const agent_land_entity_1 = require("../../agent-land/entities/agent-land.entity");
const type_entity_1 = require("../../type/entities/type.entity");
const buy_entity_1 = require("../../buy/entities/buy.entity");
const trade_entity_1 = require("../../trade/entities/trade.entity");
const transaction_entity_1 = require("../../transactions/entities/transaction.entity");
const user_entity_1 = require("../../user/user.entity");
let ProjectEntity = class ProjectEntity extends abstract_entity_1.AbstractEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "float",
        default: 0,
    }),
    __metadata("design:type", Number)
], ProjectEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: project_status_1.ProjectStatus, default: project_status_1.ProjectStatus.OPEN }),
    __metadata("design:type", String)
], ProjectEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "nftAddress", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "saleAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], ProjectEntity.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], ProjectEntity.prototype, "currencyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], ProjectEntity.prototype, "developerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.CategoryEntity, (category) => category.projects),
    (0, typeorm_1.JoinColumn)({ name: "category_id" }),
    __metadata("design:type", category_entity_1.CategoryEntity)
], ProjectEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => currency_entity_1.CurrencyEntity, (currency) => currency.projects),
    (0, typeorm_1.JoinColumn)({ name: "currency_id" }),
    __metadata("design:type", currency_entity_1.CurrencyEntity)
], ProjectEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => type_entity_1.TypeEntity, (typeEn) => typeEn.project),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "types", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => buy_entity_1.BuyEntity, (buyEn) => buyEn.project),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "buys", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => trade_entity_1.TradeEntity, (buyEn) => buyEn.project),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "trade", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => agent_land_entity_1.AgentLandEntity, (typeEn) => typeEn.project),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "agentLands", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transaction_entity_1.TransactionEntity, (transactionEn) => transactionEn.project),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "transaction", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (userEntity) => userEntity.project, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "developer_id" }),
    __metadata("design:type", user_entity_1.UserEntity)
], ProjectEntity.prototype, "developer", void 0);
ProjectEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "projects" }),
    (0, decorators_1.UseDto)(project_dto_1.ProjectDto)
], ProjectEntity);
exports.ProjectEntity = ProjectEntity;
//# sourceMappingURL=project.entity.js.map