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
exports.TradeController = void 0;
const common_1 = require("@nestjs/common");
const trade_service_1 = require("./trade.service");
const decorators_1 = require("../../decorators");
const swagger_1 = require("@nestjs/swagger");
const trade_dto_1 = require("./dto/trade.dto");
const page_options_dto_1 = require("../../common/dto/page-options.dto");
const UpdateResult_1 = require("typeorm/query-builder/result/UpdateResult");
const DeleteResult_1 = require("typeorm/query-builder/result/DeleteResult");
const create_trade_dto_1 = require("./dto/create-trade.dto");
const update_trade_dto_1 = require("./dto/update-trade.dto");
let TradeController = class TradeController {
    constructor(service) {
        this.service = service;
    }
    async create(createTradeDto, res) {
        const tradeCreated = await this.service.save(createTradeDto);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Record added",
        });
        return tradeCreated;
    }
    async findAll(pageOptionsDto, res) {
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Record Found",
            data: await this.service.findAllPageOptions(pageOptionsDto),
        });
        return this.service.findAllPageOptions(pageOptionsDto);
    }
    async findByUserId(pageOptionsDto, userId, res) {
        const tradeLands = await this.service.findAllByUserId(userId, pageOptionsDto);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Records Found",
            data: tradeLands,
        });
        return tradeLands;
    }
    async findByBuyerId(pageOptionsDto, buyerId, res) {
        const tradeLands = await this.service.findAllByBuyerId(buyerId, pageOptionsDto);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Records Found",
            data: tradeLands,
        });
        return tradeLands;
    }
    async findLandByUser(tokenId, nftAddress, res) {
        const tradeLands = await this.service.findLandByUser(tokenId, nftAddress);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Records Found",
            data: tradeLands,
        });
        return tradeLands;
    }
    async findOne(id, res) {
        const trade = await this.service.findOneLand(id);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Records Found",
            data: trade,
        });
        return trade.toDto();
    }
    async update(id, updateTradeDto, res) {
        const data = await this.service.update(id, updateTradeDto);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Record updated successfully",
            data: data
        });
    }
    async remove(id) {
        const trade = await this.service.findOne({ id });
        if (!trade) {
            throw new common_1.NotFoundException();
        }
        const deleteBuyLand = await this.service.delete(id);
        const allTrades = await this.service.findAll();
        return { deleteBuyLand, allTrades };
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: "Registration of trade",
        type: create_trade_dto_1.CreateTradeDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_trade_dto_1.CreateTradeDto, Object]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get trades",
        type: create_trade_dto_1.CreateTradeDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("/userId"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get trades",
        type: create_trade_dto_1.CreateTradeDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)("userId")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto, String, Object]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.Get)("/buyerId"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get trades",
        type: create_trade_dto_1.CreateTradeDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)("buyerId")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto, String, Object]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "findByBuyerId", null);
__decorate([
    (0, common_1.Get)("/nortary"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get trades",
        type: create_trade_dto_1.CreateTradeDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Query)("tokenId")),
    __param(1, (0, common_1.Query)("nftAddress")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "findLandByUser", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get trade by Id",
        type: trade_dto_1.TradeDto,
    }),
    __param(0, (0, decorators_1.UUIDParam)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Update trade by Id",
        type: UpdateResult_1.UpdateResult,
    }),
    __param(0, (0, decorators_1.UUIDParam)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_trade_dto_1.UpdateTradeDto, Object]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "update", null);
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
], TradeController.prototype, "remove", null);
TradeController = __decorate([
    (0, common_1.Controller)("trade"),
    (0, swagger_1.ApiTags)("trade"),
    __metadata("design:paramtypes", [trade_service_1.TradeService])
], TradeController);
exports.TradeController = TradeController;
//# sourceMappingURL=trade.controller.js.map