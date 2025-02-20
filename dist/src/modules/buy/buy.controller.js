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
exports.BuyController = void 0;
const common_1 = require("@nestjs/common");
const buy_service_1 = require("./buy.service");
const decorators_1 = require("../../decorators");
const swagger_1 = require("@nestjs/swagger");
const buy_dto_1 = require("./dto/buy.dto");
const page_options_dto_1 = require("../../common/dto/page-options.dto");
const UpdateResult_1 = require("typeorm/query-builder/result/UpdateResult");
const DeleteResult_1 = require("typeorm/query-builder/result/DeleteResult");
const create_buy_dto_1 = require("./dto/create-buy.dto");
const update_buy_dto_1 = require("./dto/update-buy.dto");
let BuyController = class BuyController {
    constructor(service) {
        this.service = service;
    }
    async create(createBuyDto, res) {
        const buyCreated = await this.service.save(createBuyDto);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Record added",
        });
        return buyCreated;
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
        const buyLands = await this.service.findAllByUserId(userId, pageOptionsDto);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Records Found",
            data: buyLands,
        });
        return buyLands;
    }
    async findOne(id, res) {
        const buy = await this.service.findOneLand(id);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Records Found",
            data: buy,
        });
        return buy.toDto();
    }
    async update(id, updateBuyDto, res) {
        const buy = await this.service.findOne({ id });
        if (!buy) {
            throw new common_1.NotFoundException();
        }
        await this.service.updateById(id, updateBuyDto);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Record updated successfully",
            data: await this.service.updateById(id, updateBuyDto),
        });
    }
    async remove(id) {
        const buy = await this.service.findOne({ id });
        if (!buy) {
            throw new common_1.NotFoundException();
        }
        const deleteBuyLand = await this.service.delete(id);
        const allBuys = await this.service.findAll();
        return { deleteBuyLand, allBuys };
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: "Registration of buy",
        type: create_buy_dto_1.CreateBuyDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_buy_dto_1.CreateBuyDto, Object]),
    __metadata("design:returntype", Promise)
], BuyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get buys",
        type: create_buy_dto_1.CreateBuyDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], BuyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("/userId"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get buys",
        type: create_buy_dto_1.CreateBuyDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)("userId")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto, String, Object]),
    __metadata("design:returntype", Promise)
], BuyController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get buy by Id",
        type: buy_dto_1.BuyDto,
    }),
    __param(0, (0, decorators_1.UUIDParam)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BuyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Update buy by Id",
        type: UpdateResult_1.UpdateResult,
    }),
    __param(0, (0, decorators_1.UUIDParam)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_buy_dto_1.UpdateBuyDto, Object]),
    __metadata("design:returntype", Promise)
], BuyController.prototype, "update", null);
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
], BuyController.prototype, "remove", null);
BuyController = __decorate([
    (0, common_1.Controller)("buy"),
    (0, swagger_1.ApiTags)("buy"),
    __metadata("design:paramtypes", [buy_service_1.BuyService])
], BuyController);
exports.BuyController = BuyController;
//# sourceMappingURL=buy.controller.js.map