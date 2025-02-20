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
exports.DocumentCatalogueEntity = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../common/abstract.entity");
const decorators_1 = require("../../../decorators");
const documentCatalogue_dto_1 = require("../dto/documentCatalogue.dto");
const user_entity_1 = require("../../user/user.entity");
let DocumentCatalogueEntity = class DocumentCatalogueEntity extends abstract_entity_1.AbstractEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DocumentCatalogueEntity.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DocumentCatalogueEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], DocumentCatalogueEntity.prototype, "isAdmin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], DocumentCatalogueEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (userEntity) => userEntity.documentCatalogue, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "user_id", referencedColumnName: "id" }),
    __metadata("design:type", user_entity_1.UserEntity)
], DocumentCatalogueEntity.prototype, "user", void 0);
DocumentCatalogueEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "documentCatalogue" }),
    (0, decorators_1.UseDto)(documentCatalogue_dto_1.DocumentCatalogueDto)
], DocumentCatalogueEntity);
exports.DocumentCatalogueEntity = DocumentCatalogueEntity;
//# sourceMappingURL=documentCatalogue.entity.js.map