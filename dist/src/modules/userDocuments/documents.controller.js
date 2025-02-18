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
exports.DocumentController = void 0;
const common_1 = require("@nestjs/common");
const documents_service_1 = require("./documents.service");
const decorators_1 = require("../../decorators");
const swagger_1 = require("@nestjs/swagger");
const documents_dto_1 = require("./dto/documents.dto");
const page_options_dto_1 = require("../../common/dto/page-options.dto");
const UpdateResult_1 = require("typeorm/query-builder/result/UpdateResult");
const DeleteResult_1 = require("typeorm/query-builder/result/DeleteResult");
const create_documents_dto_1 = require("./dto/create.documents.dto");
const update_documents_dto_1 = require("./dto/update-documents.dto");
let DocumentController = class DocumentController {
    constructor(service) {
        this.service = service;
    }
    async create(CreateDocumentDto) {
        const event = await this.service.save(CreateDocumentDto);
        return event.toDto();
    }
    async findAll(pageOptionsDto, userId, res) {
        const documents = await this.service.findAllByUserId(userId, pageOptionsDto);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Records Found",
            data: documents,
        });
        return documents;
    }
    async findOne(id) {
        const documents = await this.service.findOne({ id });
        if (!documents) {
            throw new common_1.NotFoundException();
        }
        return documents.toDto();
    }
    async update(id, updateDocumentDto) {
        const Area = await this.service.findOne({ id });
        if (!Area) {
            throw new common_1.NotFoundException();
        }
        return this.service.updateById(id, updateDocumentDto);
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
        description: "Add user Documents",
        type: create_documents_dto_1.CreateDocumentDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_documents_dto_1.CreateDocumentDto]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get Documents",
        type: create_documents_dto_1.CreateDocumentDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)("userId")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto, String, Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get documents by Id",
        type: documents_dto_1.DocumentDto,
    }),
    __param(0, (0, decorators_1.UUIDParam)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Update Area by Id",
        type: UpdateResult_1.UpdateResult,
    }),
    __param(0, (0, decorators_1.UUIDParam)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_documents_dto_1.UpdateDocumentDto]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "update", null);
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
], DocumentController.prototype, "remove", null);
DocumentController = __decorate([
    (0, common_1.Controller)("userDocuments"),
    (0, swagger_1.ApiTags)("userDocuments"),
    __metadata("design:paramtypes", [documents_service_1.DocumentService])
], DocumentController);
exports.DocumentController = DocumentController;
//# sourceMappingURL=documents.controller.js.map