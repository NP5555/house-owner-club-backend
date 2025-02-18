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
exports.AbstractTranslationEntity = exports.AbstractEntity = void 0;
const typeorm_1 = require("typeorm");
const constants_1 = require("../constants");
class AbstractEntity {
    toDto(options) {
        const dtoClass = this.dtoClass;
        if (!dtoClass) {
            throw new Error(`You need to use @UseDto on class (${this.constructor.name}) be able to call toDto function`);
        }
        return new dtoClass(this, options);
    }
}
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AbstractEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], AbstractEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], AbstractEntity.prototype, "updatedAt", void 0);
exports.AbstractEntity = AbstractEntity;
class AbstractTranslationEntity extends AbstractEntity {
}
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: constants_1.LanguageCode }),
    __metadata("design:type", String)
], AbstractTranslationEntity.prototype, "languageCode", void 0);
exports.AbstractTranslationEntity = AbstractTranslationEntity;
//# sourceMappingURL=abstract.entity.js.map