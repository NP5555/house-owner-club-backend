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
exports.AreaEntity = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../common/abstract.entity");
const decorators_1 = require("../../../decorators");
const area_dto_1 = require("../dto/area.dto");
let AreaEntity = class AreaEntity extends abstract_entity_1.AbstractEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AreaEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AreaEntity.prototype, "description", void 0);
AreaEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "area" }),
    (0, decorators_1.UseDto)(area_dto_1.AreaDto)
], AreaEntity);
exports.AreaEntity = AreaEntity;
//# sourceMappingURL=area.entity.js.map