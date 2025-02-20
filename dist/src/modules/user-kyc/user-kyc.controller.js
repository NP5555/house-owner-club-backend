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
exports.UserKYCController = void 0;
const common_1 = require("@nestjs/common");
const user_kyc_service_1 = require("./user-kyc.service");
const decorators_1 = require("../../decorators");
const swagger_1 = require("@nestjs/swagger");
const user_kyc_dto_1 = require("./dto/user-kyc.dto");
const page_options_dto_1 = require("../../common/dto/page-options.dto");
const UpdateResult_1 = require("typeorm/query-builder/result/UpdateResult");
const DeleteResult_1 = require("typeorm/query-builder/result/DeleteResult");
const create_user_kyc_dto_1 = require("./dto/create-user-kyc.dto");
const update_user_kyc_dto_1 = require("./dto/update-user-kyc.dto");
let UserKYCController = class UserKYCController {
    constructor(service) {
        this.service = service;
    }
    async create(createUserKYCDto) {
        const event = await this.service.save(createUserKYCDto);
        return event.toDto();
    }
    async findAll(pageOptionsDto, res) {
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Record Found",
            data: await this.service.findAllPageOptions(pageOptionsDto),
        });
        return this.service.findAllPageOptions(pageOptionsDto);
    }
    async findAllByUserId(pageOptionsDto, userId, res) {
        const kycs = await this.service.findAllByUserKYCId(userId, pageOptionsDto);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Records Found",
            data: kycs,
        });
        return kycs;
    }
    async findOne(id) {
        const UserKYC = await this.service.findOne({ id });
        if (!UserKYC) {
            throw new common_1.NotFoundException();
        }
        return UserKYC.toDto();
    }
    async update(id, updateUserKYCDto) {
        const UserKYC = await this.service.findOne({ id });
        if (!UserKYC) {
            throw new common_1.NotFoundException();
        }
        return this.service.updateById(id, updateUserKYCDto);
    }
    async remove(id) {
        const UserKYC = await this.service.findOne({ id });
        if (!UserKYC) {
            throw new common_1.NotFoundException();
        }
        return this.service.delete(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: "Registration of UserKYC",
        type: create_user_kyc_dto_1.CreateUserKYCDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_kyc_dto_1.CreateUserKYCDto]),
    __metadata("design:returntype", Promise)
], UserKYCController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get UserKYCs",
        type: create_user_kyc_dto_1.CreateUserKYCDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], UserKYCController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("/byId"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get Documents",
        type: create_user_kyc_dto_1.CreateUserKYCDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)("userId")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto, String, Object]),
    __metadata("design:returntype", Promise)
], UserKYCController.prototype, "findAllByUserId", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get UserKYC by Id",
        type: user_kyc_dto_1.UserKYCDto,
    }),
    __param(0, (0, decorators_1.UUIDParam)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserKYCController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Update UserKYC by Id",
        type: UpdateResult_1.UpdateResult,
    }),
    __param(0, (0, decorators_1.UUIDParam)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_kyc_dto_1.UpdateUserKYCDto]),
    __metadata("design:returntype", Promise)
], UserKYCController.prototype, "update", null);
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
], UserKYCController.prototype, "remove", null);
UserKYCController = __decorate([
    (0, common_1.Controller)("UserKYC"),
    (0, swagger_1.ApiTags)("UserKYC"),
    __metadata("design:paramtypes", [user_kyc_service_1.UserKYCService])
], UserKYCController);
exports.UserKYCController = UserKYCController;
//# sourceMappingURL=user-kyc.controller.js.map