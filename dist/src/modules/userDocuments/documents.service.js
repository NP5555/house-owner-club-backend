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
exports.DocumentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const documents_entity_1 = require("./entities/documents.entity");
const abstract_service_1 = require("../../common/abstract.service");
let DocumentService = class DocumentService extends abstract_service_1.AbstractService {
    constructor(DocumentEntityRepository) {
        super(DocumentEntityRepository);
        this.DocumentEntityRepository = DocumentEntityRepository;
    }
    async save(createDocumentDto) {
        const DocumentEntity = this.DocumentEntityRepository.create(createDocumentDto);
        await this.DocumentEntityRepository.save(DocumentEntity);
        return DocumentEntity;
    }
    async findAllPageOptions(pageOptionsDto) {
        const queryBuilder = this.DocumentEntityRepository.createQueryBuilder("documents");
        queryBuilder.leftJoinAndSelect("documents.user", "user");
        if (!!pageOptionsDto.q) {
            queryBuilder.where("documents.name like :search", {
                search: `%${pageOptionsDto.q}%`,
            });
        }
        if (!!pageOptionsDto.order) {
            queryBuilder.orderBy("documents.createdAt", pageOptionsDto.order);
        }
        const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
        if (items.length > 0) {
            return items.toPageDto(pageMetaDto);
        }
        else {
            throw new common_1.HttpException("Failed to load data", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async findAllByUserId(userId, pageOptionsDto) {
        const queryBuilder = this.DocumentEntityRepository.createQueryBuilder("documents");
        queryBuilder.leftJoinAndSelect("documents.user", "user");
        if (!!pageOptionsDto.q) {
            queryBuilder.where("documents.name like :search", {
                search: `%${pageOptionsDto.q}%`,
            });
        }
        if (!!pageOptionsDto.order) {
            queryBuilder.orderBy("documents.createdAt", pageOptionsDto.order);
        }
        queryBuilder.andWhere("user.id = :userId", { userId });
        const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
        if (items.length > 0) {
            return items.toPageDto(pageMetaDto);
        }
        else {
            throw new common_1.HttpException("Failed to load data", common_1.HttpStatus.NOT_FOUND);
        }
    }
};
DocumentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(documents_entity_1.DocumentEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DocumentService);
exports.DocumentService = DocumentService;
//# sourceMappingURL=documents.service.js.map