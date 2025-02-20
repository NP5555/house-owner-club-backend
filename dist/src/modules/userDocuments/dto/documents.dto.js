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
exports.DocumentDto = void 0;
const abstract_dto_1 = require("../../../common/dto/abstract.dto");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../user/user.entity");
class DocumentDto extends abstract_dto_1.AbstractDto {
    constructor(entity) {
        super(entity);
        this.name = entity.name;
        this.description = entity.description;
        this.url = entity.url;
        this.userId = entity.userId;
        this.user = entity.user;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DocumentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DocumentDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DocumentDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DocumentDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.UserEntity }),
    __metadata("design:type", user_entity_1.UserEntity)
], DocumentDto.prototype, "user", void 0);
exports.DocumentDto = DocumentDto;
//# sourceMappingURL=documents.dto.js.map