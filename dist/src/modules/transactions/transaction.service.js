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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("./entities/transaction.entity");
const abstract_service_1 = require("../../common/abstract.service");
let TransactionService = class TransactionService extends abstract_service_1.AbstractService {
    constructor(transactionEntityRepository) {
        super(transactionEntityRepository);
        this.transactionEntityRepository = transactionEntityRepository;
    }
    async save(createTransactionDto) {
        const typeEntity = this.transactionEntityRepository.create(createTransactionDto);
        await this.transactionEntityRepository.save(typeEntity);
        return typeEntity;
    }
    async getTransactionHash(projectId, tokenId) {
        const transactionData = await this.transactionEntityRepository
            .createQueryBuilder("transaction")
            .where("transaction.projectId = :projectId", { projectId })
            .andWhere("transaction.tokenId = :tokenId", { tokenId })
            .orderBy("transaction.createdAt", "DESC")
            .getMany();
        return transactionData;
    }
    async getAllTransactions(pageOptionsDto) {
        const queryBuilder = this.transactionEntityRepository.createQueryBuilder("transaction");
        queryBuilder.leftJoinAndSelect("transaction.project", "project");
        if (!!pageOptionsDto.q) {
            queryBuilder.where("transaction.name like :search", {
                search: `%${pageOptionsDto.q}%`,
            });
        }
        if (!!pageOptionsDto.order) {
            queryBuilder.orderBy("transaction.createdAt", pageOptionsDto.order);
        }
        const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
        if (items.length > 0) {
            return items.toPageDto(pageMetaDto);
        }
        else {
            throw new common_1.HttpException("Record Not Found", common_1.HttpStatus.NOT_FOUND);
        }
    }
};
TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.TransactionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map