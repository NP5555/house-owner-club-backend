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
exports.CreateProjectDto = void 0;
const decorators_1 = require("../../../decorators");
class CreateProjectDto {
}
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "name", void 0);
__decorate([
    (0, decorators_1.NumberField)(),
    __metadata("design:type", Number)
], CreateProjectDto.prototype, "price", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "description", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "nftAddress", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "saleAddress", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "categoryId", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "currencyId", void 0);
__decorate([
    (0, decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "developerId", void 0);
exports.CreateProjectDto = CreateProjectDto;
//# sourceMappingURL=create-project.dto.js.map