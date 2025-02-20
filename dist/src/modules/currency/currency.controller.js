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
exports.CurrencyController = void 0;
const common_1 = require("@nestjs/common");
const currency_service_1 = require("./currency.service");
const decorators_1 = require("../../decorators");
const swagger_1 = require("@nestjs/swagger");
const currency_dto_1 = require("./dto/currency.dto");
const page_options_dto_1 = require("../../common/dto/page-options.dto");
const UpdateResult_1 = require("typeorm/query-builder/result/UpdateResult");
const DeleteResult_1 = require("typeorm/query-builder/result/DeleteResult");
const create_currency_dto_1 = require("./dto/create-currency.dto");
const update_currency_dto_1 = require("./dto/update-currency.dto");
let CurrencyController = class CurrencyController {
    constructor(service) {
        this.service = service;
    }
    async create(CreateCurrencyDto) {
        const event = await this.service.save(CreateCurrencyDto);
        return event.toDto();
    }
    async findAll(pageOptionsDto, res) {
        const data = await this.service.findAllPageOptions(pageOptionsDto);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Records Found",
            data: data,
        });
        return this.service.findAllPageOptions(pageOptionsDto);
    }
    async findOne(id) {
        const Currency = await this.service.findOne({ id });
        if (!Currency) {
            throw new common_1.NotFoundException();
        }
        return Currency.toDto();
    }
    async update(id, updateCurrencyDto) {
        const Currency = await this.service.findOne({ id });
        if (!Currency) {
            throw new common_1.NotFoundException();
        }
        return this.service.updateById(id, updateCurrencyDto);
    }
    async remove(id) {
        const Currency = await this.service.findOne({ id });
        if (!Currency) {
            throw new common_1.NotFoundException();
        }
        return this.service.delete(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: "Registration of Currency",
        type: create_currency_dto_1.CreateCurrencyDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_currency_dto_1.CreateCurrencyDto]),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get Currencies",
        type: create_currency_dto_1.CreateCurrencyDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get Currency by Id",
        type: currency_dto_1.CurrencyDto,
    }),
    __param(0, (0, decorators_1.UUIDParam)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Update Currency by Id",
        type: UpdateResult_1.UpdateResult,
    }),
    __param(0, (0, decorators_1.UUIDParam)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_currency_dto_1.UpdateCurrencyDto]),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Delete event",
        type: DeleteResult_1.DeleteResult,
    }),
    __param(0, (0, decorators_1.UUIDParam)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "remove", null);
CurrencyController = __decorate([
    (0, common_1.Controller)("Currency"),
    (0, swagger_1.ApiTags)("Currency"),
    __metadata("design:paramtypes", [currency_service_1.CurrencyService])
], CurrencyController);
exports.CurrencyController = CurrencyController;
//# sourceMappingURL=currency.controller.js.map