"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rent_service_1 = require("./rent.service");
const rent_controller_1 = require("./rent.controller");
const rent_entity_1 = require("./entities/rent.entity");
const project_entity_1 = require("../project/entities/project.entity");
const user_entity_1 = require("../user/user.entity");
const transaction_entity_1 = require("../transactions/entities/transaction.entity");
const transaction_service_1 = require("../transactions/transaction.service");
let RentModule = class RentModule {
};
RentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([project_entity_1.ProjectEntity, rent_entity_1.RentEntity, user_entity_1.UserEntity, transaction_entity_1.TransactionEntity])],
        controllers: [rent_controller_1.RentController],
        providers: [rent_service_1.RentService, transaction_service_1.TransactionService],
    })
], RentModule);
exports.RentModule = RentModule;
//# sourceMappingURL=rent.module.js.map