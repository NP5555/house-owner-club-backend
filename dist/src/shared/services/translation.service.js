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
exports.TranslationService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const nestjs_i18n_1 = require("nestjs-i18n");
const abstract_dto_1 = require("../../common/dto/abstract.dto");
const decorators_1 = require("../../decorators");
const providers_1 = require("../../providers");
let TranslationService = class TranslationService {
    constructor(i18n) {
        this.i18n = i18n;
    }
    async translate(key, options) {
        return this.i18n.translate(`${key}`, Object.assign(Object.assign({}, options), { lang: providers_1.ContextProvider.getLanguage() }));
    }
    async translateNecessaryKeys(dto) {
        await Promise.all((0, lodash_1.map)(dto, async (value, key) => {
            var _a;
            if ((0, lodash_1.isString)(value)) {
                const translateDec = Reflect.getMetadata(decorators_1.STATIC_TRANSLATION_DECORATOR_KEY, dto, key);
                if (translateDec) {
                    return this.translate(`${(_a = translateDec.translationKey) !== null && _a !== void 0 ? _a : key}.${value}`);
                }
                return;
            }
            if (value instanceof abstract_dto_1.AbstractDto) {
                return this.translateNecessaryKeys(value);
            }
            if ((0, lodash_1.isArray)(value)) {
                return Promise.all((0, lodash_1.map)(value, (v) => {
                    if (v instanceof abstract_dto_1.AbstractDto) {
                        return this.translateNecessaryKeys(v);
                    }
                }));
            }
        }));
        return dto;
    }
};
TranslationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_i18n_1.I18nService])
], TranslationService);
exports.TranslationService = TranslationService;
//# sourceMappingURL=translation.service.js.map