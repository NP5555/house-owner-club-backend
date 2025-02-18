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
exports.DocumentCatalogueController = void 0;
const common_1 = require("@nestjs/common");
const documentCatalogue_service_1 = require("./documentCatalogue.service");
const decorators_1 = require("../../decorators");
const swagger_1 = require("@nestjs/swagger");
const documentCatalogue_dto_1 = require("./dto/documentCatalogue.dto");
const DeleteResult_1 = require("typeorm/query-builder/result/DeleteResult");
const createDocumentCatalogue_dto_1 = require("./dto/createDocumentCatalogue.dto");
let DocumentCatalogueController = class DocumentCatalogueController {
    constructor(service) {
        this.service = service;
    }
    async create(createRequestDocumentDto, req, file, res) {
        const document = await this.service.save(req.body.userId, JSON.parse(req.body.isAdmin.toLowerCase()), file);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Documents added",
            data: document,
        });
    }
    async findAll(res) {
        const documents = await this.service.findAllPageOptions();
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Records Found",
            data: documents,
        });
        return documents;
    }
    async findByUserId(userId, res) {
        const documents = await this.service.findAllByUserId(userId);
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
    async remove(id, res) {
        const Area = await this.service.findOne({ id });
        if (!Area) {
            throw new common_1.NotFoundException();
        }
        await this.service.delete(id);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Document Deleted",
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: "Add Documents Catalog",
        type: createDocumentCatalogue_dto_1.CreateDocumentCatalogueDto,
    }),
    (0, decorators_1.ApiFile)({ name: "document" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.UploadedFile)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createDocumentCatalogue_dto_1.CreateDocumentCatalogueDto, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DocumentCatalogueController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get Document Catalog",
        type: createDocumentCatalogue_dto_1.CreateDocumentCatalogueDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocumentCatalogueController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("/userId"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get Document Catalog",
        type: createDocumentCatalogue_dto_1.CreateDocumentCatalogueDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Query)("userId")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DocumentCatalogueController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get documents by Id",
        type: documentCatalogue_dto_1.DocumentCatalogueDto,
    }),
    __param(0, (0, decorators_1.UUIDParam)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentCatalogueController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Delete request document message",
        type: DeleteResult_1.DeleteResult,
    }),
    __param(0, (0, decorators_1.UUIDParam)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DocumentCatalogueController.prototype, "remove", null);
DocumentCatalogueController = __decorate([
    (0, common_1.Controller)("documentCatalogue"),
    (0, swagger_1.ApiTags)("documentCatalogue"),
    __metadata("design:paramtypes", [documentCatalogue_service_1.DocumentCatalogueService])
], DocumentCatalogueController);
exports.DocumentCatalogueController = DocumentCatalogueController;
//# sourceMappingURL=documentCatalogue.controller.js.map