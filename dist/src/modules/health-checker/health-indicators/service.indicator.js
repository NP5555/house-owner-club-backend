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
exports.ServiceHealthIndicator = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const terminus_1 = require("@nestjs/terminus");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let ServiceHealthIndicator = class ServiceHealthIndicator extends terminus_1.HealthIndicator {
    constructor(clientProxy) {
        super();
        this.clientProxy = clientProxy;
    }
    async isHealthy(eventName) {
        try {
            if (!this.clientProxy) {
                return {
                    [eventName]: {
                        status: 'down',
                    },
                };
            }
            const result = await (0, rxjs_1.firstValueFrom)(this.clientProxy.send(eventName, { check: true }).pipe((0, operators_1.timeout)(10000)), {
                defaultValue: undefined,
            });
            return {
                [eventName]: result,
            };
        }
        catch (error) {
            throw new terminus_1.HealthCheckError(`${eventName} failed`, {
                [eventName]: error,
            });
        }
    }
};
ServiceHealthIndicator = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Optional)()),
    __param(0, (0, common_1.Inject)('NATS_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], ServiceHealthIndicator);
exports.ServiceHealthIndicator = ServiceHealthIndicator;
//# sourceMappingURL=service.indicator.js.map