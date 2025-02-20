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
exports.CreateBulkAgentLandDto = void 0;
const decorators_1 = require("../../../decorators");
const class_validator_1 = require("class-validator");
class CreateBulkAgentLandDto {
}
__decorate([
    (0, decorators_1.NumberField)(),
    __metadata("design:type", Number)
], CreateBulkAgentLandDto.prototype, "startTokenId", void 0);
__decorate([
    (0, decorators_1.NumberField)(),
    __metadata("design:type", Number)
], CreateBulkAgentLandDto.prototype, "count", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBulkAgentLandDto.prototype, "typeId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBulkAgentLandDto.prototype, "developerId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBulkAgentLandDto.prototype, "projectId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateBulkAgentLandDto.prototype, "youtubeLinks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateBulkAgentLandDto.prototype, "landImage", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBulkAgentLandDto.prototype, "agentId", void 0);
exports.CreateBulkAgentLandDto = CreateBulkAgentLandDto;
//# sourceMappingURL=create-bulk-agent-land.dto.js.map