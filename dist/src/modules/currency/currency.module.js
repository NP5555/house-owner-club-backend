"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const currency_service_1 = require("./currency.service");
const currency_controller_1 = require("./currency.controller");
const currency_entity_1 = require("./entities/currency.entity");
const project_entity_1 = require("../project/entities/project.entity");
let CurrencyModule = class CurrencyModule {
};
CurrencyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([project_entity_1.ProjectEntity, currency_entity_1.CurrencyEntity]),
        ],
        controllers: [currency_controller_1.CurrencyController],
        providers: [currency_service_1.CurrencyService]
    })
], CurrencyModule);
exports.CurrencyModule = CurrencyModule;
//# sourceMappingURL=currency.module.js.map