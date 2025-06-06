"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentCatalogueService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const documentCatalogue_entity_1 = require("./entities/documentCatalogue.entity");
const abstract_service_1 = require("../../common/abstract.service");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let DocumentCatalogueService = class DocumentCatalogueService extends abstract_service_1.AbstractService {
    constructor(DocumentCatalogueEntityRepository) {
        super(DocumentCatalogueEntityRepository);
        this.DocumentCatalogueEntityRepository = DocumentCatalogueEntityRepository;
    }
    async save(userId, isAdmin, file) {
        try {
            let DocumentEntity;
            if (file) {
                const uploadsDirectory = "uploads";
                const filename = Date.now() + "_" + file.originalname;
                const filePath = path.join(uploadsDirectory, filename);
                if (!fs.existsSync(uploadsDirectory)) {
                    fs.mkdirSync(uploadsDirectory, { recursive: true });
                }
                fs.writeFileSync(filePath, file.buffer);
                DocumentEntity = this.DocumentCatalogueEntityRepository.create({
                    document: filePath,
                    name: file.originalname,
                    isAdmin: isAdmin,
                    userId: userId,
                });
            }
            await this.DocumentCatalogueEntityRepository.save(DocumentEntity);
            return DocumentEntity;
        }
        catch (error) {
            throw new common_1.HttpException("Record not added", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAllPageOptions() {
        const queryBuilder = this.DocumentCatalogueEntityRepository.createQueryBuilder("documentCatalogue");
        queryBuilder.leftJoinAndSelect("documentCatalogue.user", "user");
        queryBuilder.where("documentCatalogue.isAdmin = :isAdmin", {
            isAdmin: true,
        });
        const documents = await queryBuilder.getMany();
        if (documents.length > 0) {
            return documents;
        }
        else {
            throw new common_1.HttpException("Record not found", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async findAllByUserId(userId) {
        const queryBuilder = this.DocumentCatalogueEntityRepository.createQueryBuilder("documentCatalogue");
        queryBuilder.leftJoinAndSelect("documentCatalogue.user", "user");
        queryBuilder.andWhere("user.id = :userId", { userId });
        const documents = await queryBuilder.getMany();
        if (documents.length > 0) {
            return documents;
        }
        else {
            throw new common_1.HttpException("Record not found", common_1.HttpStatus.NOT_FOUND);
        }
    }
};
DocumentCatalogueService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(documentCatalogue_entity_1.DocumentCatalogueEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DocumentCatalogueService);
exports.DocumentCatalogueService = DocumentCatalogueService;
//# sourceMappingURL=documentCatalogue.service.js.map