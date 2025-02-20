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
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const transaction_service_1 = require("./transaction.service");
const decorators_1 = require("../../decorators");
const swagger_1 = require("@nestjs/swagger");
const transaction_dto_1 = require("./dto/transaction.dto");
const page_options_dto_1 = require("../../common/dto/page-options.dto");
const create_transaction_dto_1 = require("./dto/create-transaction.dto");
const constants_1 = require("../../constants");
let TransactionController = class TransactionController {
    constructor(service) {
        this.service = service;
    }
    async create(createTransactionDto, res) {
        const transactionSaved = await this.service.save(createTransactionDto);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Record added",
        });
        return transactionSaved;
    }
    async findAll(pageOptionsDto, res) {
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Record Found",
            data: await this.service.getAllTransactions(pageOptionsDto),
        });
        return this.service.getAllTransactions(pageOptionsDto);
    }
    async findOne(id) {
        const Type = await this.service.findOne({ id });
        if (!Type) {
            throw new common_1.HttpException("Record Not Found", common_1.HttpStatus.NOT_FOUND);
        }
        return Type.toDto();
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.Auth)([constants_1.RoleType.USER, constants_1.RoleType.ADMIN]),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: "Registration of Transaction",
        type: create_transaction_dto_1.CreateTransactionDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CreateTransactionDto, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.Auth)([constants_1.RoleType.USER, constants_1.RoleType.ADMIN]),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get Transactions",
        type: create_transaction_dto_1.CreateTransactionDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, decorators_1.Auth)([constants_1.RoleType.USER, constants_1.RoleType.ADMIN]),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get Transaction by Id",
        type: transaction_dto_1.TransactionDto,
    }),
    __param(0, (0, decorators_1.UUIDParam)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "findOne", null);
TransactionController = __decorate([
    (0, common_1.Controller)("Transaction"),
    (0, swagger_1.ApiTags)("Transaction"),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionController);
exports.TransactionController = TransactionController;
//# sourceMappingURL=transaction.controller.js.map