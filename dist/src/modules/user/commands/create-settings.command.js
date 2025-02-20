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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSettingsHandler = exports.CreateSettingsCommand = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_settings_entity_1 = require("../user-settings.entity");
class CreateSettingsCommand {
    constructor(userId, createSettingsDto) {
        this.userId = userId;
        this.createSettingsDto = createSettingsDto;
    }
}
exports.CreateSettingsCommand = CreateSettingsCommand;
let CreateSettingsHandler = class CreateSettingsHandler {
    constructor(userSettingsRepository) {
        this.userSettingsRepository = userSettingsRepository;
    }
    execute(command) {
        const { userId, createSettingsDto } = command;
        const userSettingsEntity = this.userSettingsRepository.create(createSettingsDto);
        userSettingsEntity.userId = userId;
        return this.userSettingsRepository.save(userSettingsEntity);
    }
};
CreateSettingsHandler = __decorate([
    (0, cqrs_1.CommandHandler)(CreateSettingsCommand),
    __param(0, (0, typeorm_1.InjectRepository)(user_settings_entity_1.UserSettingsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CreateSettingsHandler);
exports.CreateSettingsHandler = CreateSettingsHandler;
//# sourceMappingURL=create-settings.command.js.map