"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
require("./boilerplate.polyfill");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_i18n_1 = require("nestjs-i18n");
const path_1 = __importDefault(require("path"));
const typeorm_2 = require("typeorm");
const typeorm_transactional_1 = require("typeorm-transactional");
const serve_static_1 = require("@nestjs/serve-static");
const path_2 = require("path");
const area_module_1 = require("./modules/area/area.module");
const area_entity_1 = require("./modules/area/entities/area.entity");
const buy_module_1 = require("./modules/buy/buy.module");
const buy_entity_1 = require("./modules/buy/entities/buy.entity");
const dashboards_module_1 = require("./modules/dashboards/dashboards.module");
const trade_module_1 = require("./modules/trade/trade.module");
const trade_entity_1 = require("./modules/trade/entities/trade.entity");
const documents_module_1 = require("./modules/userDocuments/documents.module");
const documents_entity_1 = require("./modules/userDocuments/entities/documents.entity");
const requestDocument_module_1 = require("./modules/requestDocument/requestDocument.module");
const requestDocument_entity_1 = require("./modules/requestDocument/entities/requestDocument.entity");
const documentCatalogue_module_1 = require("./modules/documentCatalogue/documentCatalogue.module");
const documentCatalogue_entity_1 = require("./modules/documentCatalogue/entities/documentCatalogue.entity");
const auth_module_1 = require("./modules/auth/auth.module");
const category_module_1 = require("./modules/category/category.module");
const agent_land_module_1 = require("./modules/agent-land/agent-land.module");
const agent_land_entity_1 = require("./modules/agent-land/entities/agent-land.entity");
const type_entity_1 = require("./modules/type/entities/type.entity");
const category_entity_1 = require("./modules/category/entities/category.entity");
const currency_module_1 = require("./modules/currency/currency.module");
const currency_entity_1 = require("./modules/currency/entities/currency.entity");
const health_checker_module_1 = require("./modules/health-checker/health-checker.module");
const project_entity_1 = require("./modules/project/entities/project.entity");
const project_module_1 = require("./modules/project/project.module");
const user_entity_1 = require("./modules/user/user.entity");
const user_module_1 = require("./modules/user/user.module");
const transaction_entity_1 = require("./modules/transactions/entities/transaction.entity");
const transaction_module_1 = require("./modules/transactions/transaction.module");
const newsletter_entity_1 = require("./modules/newsletter/entities/newsletter.entity");
const newsletter_module_1 = require("./modules/newsletter/newsletter.module");
const user_settings_entity_1 = require("./modules/user/user-settings.entity");
const user_kyc_entity_1 = require("./modules/user-kyc/entities/user-kyc.entity");
const type_module_1 = require("./modules/type/type.module");
const user_kyc_module_1 = require("./modules/user-kyc/user-kyc.module");
const rent_entity_1 = require("./modules/rent/entities/rent.entity");
const rent_module_1 = require("./modules/rent/rent.module");
const api_config_service_1 = require("./shared/services/api-config.service");
const shared_module_1 = require("./shared/shared.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ".env",
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [shared_module_1.SharedModule],
                useFactory: (configService) => (Object.assign(Object.assign({}, configService.postgresConfig), { entities: [
                        user_entity_1.UserEntity,
                        user_settings_entity_1.UserSettingsEntity,
                        project_entity_1.ProjectEntity,
                        transaction_entity_1.TransactionEntity,
                        category_entity_1.CategoryEntity,
                        area_entity_1.AreaEntity,
                        currency_entity_1.CurrencyEntity,
                        user_kyc_entity_1.UserKYCEntity,
                        type_entity_1.TypeEntity,
                        agent_land_entity_1.AgentLandEntity,
                        buy_entity_1.BuyEntity,
                        trade_entity_1.TradeEntity,
                        documents_entity_1.DocumentEntity,
                        requestDocument_entity_1.RequestDocumentEntity,
                        documentCatalogue_entity_1.DocumentCatalogueEntity,
                        rent_entity_1.RentEntity,
                        newsletter_entity_1.NewsletterEtity
                    ], keepConnectionAlive: false, logging: ['error', 'warn'], extra: {
                        ssl: configService.nodeEnv === 'production' ? {
                            rejectUnauthorized: false,
                        } : false
                    } })),
                inject: [api_config_service_1.ApiConfigService],
                dataSourceFactory: async (options) => {
                    if (!options) {
                        throw new Error("Invalid options passed");
                    }
                    const dataSource = new typeorm_2.DataSource(options);
                    return (0, typeorm_transactional_1.addTransactionalDataSource)(await dataSource.initialize());
                },
            }),
            nestjs_i18n_1.I18nModule.forRootAsync({
                useFactory: (configService) => ({
                    fallbackLanguage: configService.fallbackLanguage,
                    loaderOptions: {
                        path: path_1.default.join(__dirname, "/i18n/"),
                        watch: configService.isDevelopment,
                    },
                    resolvers: [
                        new nestjs_i18n_1.QueryResolver(['lang']),
                        new nestjs_i18n_1.AcceptLanguageResolver(),
                    ],
                }),
                imports: [shared_module_1.SharedModule],
                inject: [api_config_service_1.ApiConfigService],
            }),
            health_checker_module_1.HealthCheckerModule,
            area_module_1.AreaModule,
            category_module_1.CategoryModule,
            currency_module_1.CurrencyModule,
            project_module_1.ProjectModule,
            transaction_module_1.TransactionModule,
            user_kyc_module_1.UserKYCModule,
            type_module_1.TypeModule,
            agent_land_module_1.AgentLandModule,
            buy_module_1.BuyModule,
            trade_module_1.TradeModule,
            documents_module_1.DocumentModule,
            requestDocument_module_1.RequestDocumentModule,
            dashboards_module_1.UserDashboardModule,
            documentCatalogue_module_1.DocumentCatalogueModule,
            rent_module_1.RentModule,
            newsletter_module_1.NewsletterModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_2.join)(__dirname, '..', ''),
            }),
        ],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map