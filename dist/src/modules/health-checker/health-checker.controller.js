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
exports.HealthCheckerController = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const service_indicator_1 = require("./health-indicators/service.indicator");
let HealthCheckerController = class HealthCheckerController {
    constructor(healthCheckService, ormIndicator, serviceIndicator) {
        this.healthCheckService = healthCheckService;
        this.ormIndicator = ormIndicator;
        this.serviceIndicator = serviceIndicator;
    }
    async check() {
        return this.healthCheckService.check([
            () => this.ormIndicator.pingCheck('database', { timeout: 1500 }),
            () => this.serviceIndicator.isHealthy('search-service-health'),
        ]);
    }
    ping() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV,
            service: 'house-owner-club-backend'
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, terminus_1.HealthCheck)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthCheckerController.prototype, "check", null);
__decorate([
    (0, common_1.Get)('ping'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthCheckerController.prototype, "ping", null);
HealthCheckerController = __decorate([
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [terminus_1.HealthCheckService,
        terminus_1.TypeOrmHealthIndicator,
        service_indicator_1.ServiceHealthIndicator])
], HealthCheckerController);
exports.HealthCheckerController = HealthCheckerController;
//# sourceMappingURL=health-checker.controller.js.map