"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserKYCModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_kyc_service_1 = require("./user-kyc.service");
const user_kyc_controller_1 = require("./user-kyc.controller");
const user_kyc_entity_1 = require("./entities/user-kyc.entity");
const user_entity_1 = require("../user/user.entity");
let UserKYCModule = class UserKYCModule {
};
UserKYCModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, user_kyc_entity_1.UserKYCEntity]),
        ],
        controllers: [user_kyc_controller_1.UserKYCController],
        providers: [user_kyc_service_1.UserKYCService]
    })
], UserKYCModule);
exports.UserKYCModule = UserKYCModule;
//# sourceMappingURL=user-kyc.module.js.map