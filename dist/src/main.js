"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const platform_express_1 = require("@nestjs/platform-express");
const compression_1 = __importDefault(require("compression"));
const express_ctx_1 = require("express-ctx");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const typeorm_transactional_1 = require("typeorm-transactional");
const app_module_1 = require("./app.module");
const bad_request_filter_1 = require("./filters/bad-request.filter");
const query_failed_filter_1 = require("./filters/query-failed.filter");
const translation_interceptor_service_1 = require("./interceptors/translation-interceptor.service");
const setup_swagger_1 = require("./setup-swagger");
const api_config_service_1 = require("./shared/services/api-config.service");
const translation_service_1 = require("./shared/services/translation.service");
const shared_module_1 = require("./shared/shared.module");
async function bootstrap() {
    (0, typeorm_transactional_1.initializeTransactionalContext)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(), {
        cors: {
            origin: ['https://myhoc.netlify.app', 'http://localhost:3000', 'https://hoc-fe-eta.vercel.app', 'https://app.myhoc.io'],
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            credentials: true,
        }
    });
    app.setGlobalPrefix('api');
    app.enable('trust proxy');
    app.use((0, helmet_1.default)());
    app.use((0, express_rate_limit_1.default)({
        windowMs: 1 * 60 * 1000,
        max: 1000,
    }));
    app.use((0, compression_1.default)());
    app.use((0, morgan_1.default)('combined'));
    app.enableVersioning();
    const reflector = app.get(core_1.Reflector);
    app.useGlobalFilters(new bad_request_filter_1.HttpExceptionFilter(reflector), new query_failed_filter_1.QueryFailedFilter(reflector));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(reflector), new translation_interceptor_service_1.TranslationInterceptor(app.select(shared_module_1.SharedModule).get(translation_service_1.TranslationService)));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
        transform: true,
        dismissDefaultMessages: true,
        exceptionFactory: (errors) => new common_1.UnprocessableEntityException(errors),
    }));
    const configService = app.select(shared_module_1.SharedModule).get(api_config_service_1.ApiConfigService);
    if (configService.natsEnabled) {
        const natsConfig = configService.natsConfig;
        app.connectMicroservice({
            transport: microservices_1.Transport.NATS,
            options: {
                url: `nats://${natsConfig.host}:${natsConfig.port}`,
                queue: 'main_service',
            },
        });
        await app.startAllMicroservices();
    }
    if (configService.documentationEnabled) {
        (0, setup_swagger_1.setupSwagger)(app);
    }
    app.use(express_ctx_1.middleware);
    if (!configService.isDevelopment) {
        app.enableShutdownHooks();
    }
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`🚀 Application is running on: http://localhost:${port}`);
    return app;
}
exports.bootstrap = bootstrap;
void bootstrap();
//# sourceMappingURL=main.js.map