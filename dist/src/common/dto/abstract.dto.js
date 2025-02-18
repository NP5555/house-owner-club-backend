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
exports.AbstractTranslationDto = exports.AbstractDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../decorators");
const providers_1 = require("../../providers");
class AbstractDto {
    constructor(entity, options) {
        var _a;
        if (!(options === null || options === void 0 ? void 0 : options.excludeFields)) {
            this.id = entity.id;
            this.createdAt = entity.createdAt;
            this.updatedAt = entity.updatedAt;
        }
        const languageCode = providers_1.ContextProvider.getLanguage();
        if (languageCode && entity.translations) {
            const translationEntity = entity.translations.find((titleTranslation) => titleTranslation.languageCode === languageCode);
            const fields = {};
            for (const key of Object.keys(translationEntity)) {
                const metadata = Reflect.getMetadata(decorators_1.DYNAMIC_TRANSLATION_DECORATOR_KEY, this, key);
                if (metadata) {
                    fields[key] = translationEntity[key];
                }
            }
            Object.assign(this, fields);
        }
        else {
            this.translations = (_a = entity.translations) === null || _a === void 0 ? void 0 : _a.toDtos();
        }
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AbstractDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], AbstractDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], AbstractDto.prototype, "updatedAt", void 0);
exports.AbstractDto = AbstractDto;
class AbstractTranslationDto extends AbstractDto {
    constructor(entity) {
        super(entity, { excludeFields: true });
    }
}
exports.AbstractTranslationDto = AbstractTranslationDto;
//# sourceMappingURL=abstract.dto.js.map