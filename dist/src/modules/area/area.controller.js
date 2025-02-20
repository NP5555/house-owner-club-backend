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
exports.AreaController = void 0;
const common_1 = require("@nestjs/common");
const area_service_1 = require("./area.service");
const decorators_1 = require("../../decorators");
const swagger_1 = require("@nestjs/swagger");
const area_dto_1 = require("./dto/area.dto");
const page_options_dto_1 = require("../../common/dto/page-options.dto");
const UpdateResult_1 = require("typeorm/query-builder/result/UpdateResult");
const DeleteResult_1 = require("typeorm/query-builder/result/DeleteResult");
const create_area_dto_1 = require("./dto/create-area.dto");
const update_area_dto_1 = require("./dto/update-area.dto");
let AreaController = class AreaController {
    constructor(service) {
        this.service = service;
    }
    async create(CreateAreaDto) {
        const event = await this.service.save(CreateAreaDto);
        return event.toDto();
    }
    findAll(pageOptionsDto) {
        return this.service.findAllPageOptions(pageOptionsDto);
    }
    async findOne(id) {
        const Area = await this.service.findOne({ id });
        if (!Area) {
            throw new common_1.NotFoundException();
        }
        return Area.toDto();
    }
    async update(id, updateAreaDto) {
        const Area = await this.service.findOne({ id });
        if (!Area) {
            throw new common_1.NotFoundException();
        }
        return this.service.updateById(id, updateAreaDto);
    }
    async remove(id) {
        const Area = await this.service.findOne({ id });
        if (!Area) {
            throw new common_1.NotFoundException();
        }
        return this.service.delete(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Registration of Area',
        type: create_area_dto_1.CreateAreaDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_area_dto_1.CreateAreaDto]),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Get Areas',
        type: create_area_dto_1.CreateAreaDto,
        isArray: true
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto]),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Get Area by Id',
        type: area_dto_1.AreaDto,
    }),
    __param(0, (0, decorators_1.UUIDParam)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Update Area by Id',
        type: UpdateResult_1.UpdateResult,
    }),
    __param(0, (0, decorators_1.UUIDParam)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_area_dto_1.UpdateAreaDto]),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Delete event',
        type: DeleteResult_1.DeleteResult,
    }),
    __param(0, (0, decorators_1.UUIDParam)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "remove", null);
AreaController = __decorate([
    (0, common_1.Controller)('Area'),
    (0, swagger_1.ApiTags)('Area'),
    __metadata("design:paramtypes", [area_service_1.AreaService])
], AreaController);
exports.AreaController = AreaController;
//# sourceMappingURL=area.controller.js.map