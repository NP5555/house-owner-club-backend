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
exports.ApiConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const lodash_1 = require("lodash");
const user_subscriber_1 = require("../../entity-subscribers/user-subscriber");
const snake_naming_strategy_1 = require("../../snake-naming.strategy");
let ApiConfigService = class ApiConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    get isDevelopment() {
        return this.nodeEnv === 'development';
    }
    get isProduction() {
        return this.nodeEnv === 'production';
    }
    get isTest() {
        return this.nodeEnv === 'test';
    }
    getNumber(key) {
        const value = this.get(key);
        try {
            return Number(value);
        }
        catch (_a) {
            throw new Error(key + ' environment variable is not a number');
        }
    }
    getBoolean(key) {
        const value = this.get(key);
        try {
            return Boolean(JSON.parse(value));
        }
        catch (_a) {
            throw new Error(key + ' env var is not a boolean');
        }
    }
    getString(key) {
        const value = this.get(key);
        return value.replace(/\\n/g, '\n');
    }
    get nodeEnv() {
        return this.getString('NODE_ENV');
    }
    get fallbackLanguage() {
        return this.getString('FALLBACK_LANGUAGE');
    }
    get postgresConfig() {
        let entities = [
            __dirname + '/../../modules/**/*.entity{.ts,.js}',
            __dirname + '/../../modules/**/*.view-entity{.ts,.js}',
        ];
        let migrations = [__dirname + '/../../database/migrations/*{.ts,.js}'];
        if (module.hot) {
            const entityContext = require.context('./../../modules', true, /\.entity\.ts$/);
            entities = entityContext.keys().map((id) => {
                const entityModule = entityContext(id);
                const [entity] = Object.values(entityModule);
                return entity;
            });
            const migrationContext = require.context('./../../database/migrations', false, /\.ts$/);
            migrations = migrationContext.keys().map((id) => {
                const migrationModule = migrationContext(id);
                const [migration] = Object.values(migrationModule);
                return migration;
            });
        }
        return {
            entities,
            migrations,
            keepConnectionAlive: !this.isTest,
            dropSchema: this.isTest,
            type: 'postgres',
            name: 'postgres',
            host: this.getString('DB_HOST'),
            port: this.getNumber('DB_PORT'),
            username: this.getString('DB_USERNAME'),
            password: this.getString('DB_PASSWORD'),
            database: this.getString('DB_DATABASE'),
            subscribers: [user_subscriber_1.UserSubscriber],
            migrationsRun: true,
            logging: this.getBoolean('ENABLE_ORM_LOGS'),
            namingStrategy: new snake_naming_strategy_1.SnakeNamingStrategy(),
            ssl: {
                rejectUnauthorized: false, // Disable strict SSL certificate validation (for Render.com)
            },
        };               
    }
    get awsS3Config() {
        return {
            bucketRegion: this.getString('AWS_S3_BUCKET_REGION'),
            bucketApiVersion: this.getString('AWS_S3_API_VERSION'),
            bucketName: this.getString('AWS_S3_BUCKET_NAME'),
        };
    }
    get documentationEnabled() {
        return this.getBoolean('ENABLE_DOCUMENTATION');
    }
    get natsEnabled() {
        return this.getBoolean('NATS_ENABLED');
    }
    get natsConfig() {
        return {
            host: this.getString('NATS_HOST'),
            port: this.getNumber('NATS_PORT'),
        };
    }
    get authConfig() {
        return {
            privateKey: this.getString('JWT_PRIVATE_KEY'),
            publicKey: this.getString('JWT_PUBLIC_KEY'),
            jwtExpirationTime: this.getNumber('JWT_EXPIRATION_TIME'),
        };
    }
    get appConfig() {
        return {
            port: this.getString('PORT'),
        };
    }
    get(key) {
        const value = this.configService.get(key);
        if ((0, lodash_1.isNil)(value)) {
            throw new Error(key + ' environment variable does not set');
        }
        return value;
    }
};
ApiConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ApiConfigService);
exports.ApiConfigService = ApiConfigService;
//# sourceMappingURL=api-config.service.js.map