"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = exports.handlers = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const create_settings_command_1 = require("./commands/create-settings.command");
const user_controller_1 = require("./user.controller");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
const user_settings_entity_1 = require("./user-settings.entity");
const user_kyc_entity_1 = require("../user-kyc/entities/user-kyc.entity");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const path_1 = require("path");
exports.handlers = [create_settings_command_1.CreateSettingsHandler];
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, user_settings_entity_1.UserSettingsEntity, user_kyc_entity_1.UserKYCEntity]),
            mailer_1.MailerModule.forRootAsync({
                useFactory: async (config) => ({
                    transport: {
                        host: "smtp.gmail.com",
                        secure: false,
                        auth: {
                            user: "ngs.naeemashraf@gmail.com",
                            pass: "ABCDRTYU990",
                        },
                        logger: true,
                        debug: true
                    },
                    defaults: {
                        from: `"No Reply" <hello@hoc.com`,
                    },
                    template: {
                        dir: (0, path_1.join)(__dirname, "templates"),
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [user_controller_1.UserController],
        exports: [user_service_1.UserService],
        providers: [user_service_1.UserService, ...exports.handlers],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map