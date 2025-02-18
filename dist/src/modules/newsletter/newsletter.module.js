"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const newsletter_service_1 = require("./newsletter.service");
const newsletter_controller_1 = require("./newsletter.controller");
const newsletter_entity_1 = require("./entities/newsletter.entity");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const path_1 = require("path");
let NewsletterModule = class NewsletterModule {
};
NewsletterModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([newsletter_entity_1.NewsletterEtity]),
            mailer_1.MailerModule.forRootAsync({
                useFactory: async (config) => ({
                    transport: {
                        host: "smtp.gmail.com",
                        secure: false,
                        auth: {
                            user: "ngs.naeemashraf@gmail.com",
                            pass: "ABCDRTYU990",
                        },
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
        controllers: [newsletter_controller_1.NewsletterController],
        providers: [newsletter_service_1.NewsletterService]
    })
], NewsletterModule);
exports.NewsletterModule = NewsletterModule;
//# sourceMappingURL=newsletter.module.js.map