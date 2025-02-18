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
exports.UpdateAgentLandDto = void 0;
const land_status_1 = require("../../../constants/land-status");
const decorators_1 = require("../../../decorators");
class UpdateAgentLandDto {
}
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateAgentLandDto.prototype, "tokenId", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateAgentLandDto.prototype, "status", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateAgentLandDto.prototype, "agentId", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateAgentLandDto.prototype, "projectId", void 0);
__decorate([
    (0, decorators_1.StringFieldOptional)(),
    __metadata("design:type", String)
], UpdateAgentLandDto.prototype, "developerId", void 0);
exports.UpdateAgentLandDto = UpdateAgentLandDto;
//# sourceMappingURL=update-agent-land.dto.js.map