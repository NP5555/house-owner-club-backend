"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const api_config_service_1 = require("../../shared/services/api-config.service");
const user_module_1 = require("../user/user.module");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./jwt.strategy");
const public_strategy_1 = require("./public.strategy");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const path_1 = require("path");
const config_1 = require("@nestjs/config");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                useFactory: (configService) => ({
                    privateKey: configService.authConfig.privateKey,
                    publicKey: configService.authConfig.publicKey,
                    signOptions: {
                        algorithm: 'RS256',
                    },
                    verifyOptions: {
                        algorithms: ['RS256'],
                    },
                }),
                inject: [api_config_service_1.ApiConfigService],
            }),
            mailer_1.MailerModule.forRootAsync({
                useFactory: async (config) => ({
                    transport: {
                        host: "smtp.gmail.com",
                        secure: false,
                        auth: {
                            user: "ngs.naeemashraf@gmail.com",
                            pass: "gjcrjehcmiasqzoe",
                        },
                    },
                    defaults: {
                        from: `"No Reply" <hello@hoc.com>`,
                    },
                    template: {
                        dir: (0, path_1.join)(__dirname, "../../templates"),
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, public_strategy_1.PublicStrategy],
        exports: [jwt_1.JwtModule, auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map