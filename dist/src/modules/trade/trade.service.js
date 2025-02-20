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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const trade_entity_1 = require("./entities/trade.entity");
const transaction_entity_1 = require(".././transactions/entities/transaction.entity");
const transaction_service_1 = require("../transactions/transaction.service");
const abstract_service_1 = require("../../common/abstract.service");
let TradeService = class TradeService extends abstract_service_1.AbstractService {
    constructor(tradeEntityRepository, transactionEntityRepository, transactionService) {
        super(tradeEntityRepository);
        this.tradeEntityRepository = tradeEntityRepository;
        this.transactionEntityRepository = transactionEntityRepository;
        this.transactionService = transactionService;
    }
    async save(createTradeDto) {
        let transactionData = {
            tokenId: Number(createTradeDto.tokenId),
            projectId: createTradeDto.projectId,
            tag: createTradeDto.tag,
            transactionHash: createTradeDto.transactionHash,
        };
        const tradeData = Object.keys(createTradeDto).reduce((object, key) => {
            if (key !== "transactionHash" && key !== "tag") {
                object[key] = createTradeDto[key];
            }
            return object;
        }, {});
        const tradeEntity = this.tradeEntityRepository.create(tradeData);
        await this.tradeEntityRepository.save(tradeEntity);
        await this.tradeEntityRepository.manager.transaction(async (transactionalEntityManager) => {
            await Promise.all([
                transactionalEntityManager.save(trade_entity_1.TradeEntity, tradeEntity),
                transactionalEntityManager.save(transaction_entity_1.TransactionEntity, transactionData),
            ]);
        });
        return tradeEntity;
    }
    async findAllPageOptions(pageOptionsDto) {
        const queryBuilder = this.tradeEntityRepository.createQueryBuilder("trade");
        queryBuilder.leftJoinAndSelect("trade.project", "project");
        queryBuilder.leftJoinAndSelect("trade.type", "type");
        queryBuilder.leftJoinAndSelect("project.category", "category");
        queryBuilder.leftJoinAndSelect("project.currency", "currency");
        queryBuilder.leftJoinAndSelect("trade.agentLand", "agentLand");
        queryBuilder.leftJoinAndSelect("trade.user", "user");
        if (!!pageOptionsDto.q) {
            queryBuilder.where("trade.name like :search", {
                search: `%${pageOptionsDto.q}%`,
            });
        }
        if (!!pageOptionsDto.order) {
            queryBuilder.orderBy("trade.createdAt", pageOptionsDto.order);
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
        const queryBuilder = this.tradeEntityRepository.createQueryBuilder("trade");
        queryBuilder.leftJoinAndSelect("trade.project", "project");
        queryBuilder.leftJoinAndSelect("trade.type", "type");
        queryBuilder.leftJoinAndSelect("project.category", "category");
        queryBuilder.leftJoinAndSelect("project.currency", "currency");
        queryBuilder.leftJoinAndSelect("trade.agentLand", "agent_land");
        queryBuilder.leftJoinAndSelect("trade.user", "user");
        queryBuilder.andWhere("user.id = :userId", { userId });
        if (!!pageOptionsDto.q) {
            queryBuilder.where("trade.name like :search", {
                search: `%${pageOptionsDto.q}%`,
            });
        }
        if (!!pageOptionsDto.order) {
            queryBuilder.orderBy("trade.createdAt", pageOptionsDto.order);
        }
        const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
        if (items.length > 0) {
            return items.toPageDto(pageMetaDto);
        }
        else {
            throw new common_1.HttpException("Failed to load data", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async findAllByBuyerId(buyerId, pageOptionsDto) {
        const queryBuilder = this.tradeEntityRepository.createQueryBuilder("trade");
        queryBuilder.leftJoinAndSelect("trade.project", "project");
        queryBuilder.leftJoinAndSelect("trade.type", "type");
        queryBuilder.leftJoinAndSelect("project.category", "category");
        queryBuilder.leftJoinAndSelect("project.currency", "currency");
        queryBuilder.leftJoinAndSelect("trade.agentLand", "agent_land");
        queryBuilder.leftJoinAndSelect("trade.user", "user");
        queryBuilder.andWhere("trade.buyerId = :buyerId", { buyerId });
        if (!!pageOptionsDto.q) {
            queryBuilder.where("trade.name like :search", {
                search: `%${pageOptionsDto.q}%`,
            });
        }
        if (!!pageOptionsDto.order) {
            queryBuilder.orderBy("trade.createdAt", pageOptionsDto.order);
        }
        const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
        if (items.length > 0) {
            return items.toPageDto(pageMetaDto);
        }
        else {
            throw new common_1.HttpException("Failed to load data", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async findOneLand(id) {
        const queryBuilder = this.tradeEntityRepository
            .createQueryBuilder("trade")
            .leftJoinAndSelect("trade.project", "project")
            .leftJoinAndSelect("trade.type", "type")
            .leftJoinAndSelect("project.category", "category")
            .leftJoinAndSelect("project.currency", "currency")
            .leftJoinAndSelect("trade.agentLand", "agentLand")
            .leftJoinAndSelect("trade.user", "user")
            .where("trade.id = :id", { id })
            .getOne();
        if (!queryBuilder) {
            throw new common_1.HttpException("Failed to load data", common_1.HttpStatus.NOT_FOUND);
        }
        return queryBuilder;
    }
    async findLandByUser(tokenId, nftAddress) {
        const queryBuilder = await this.tradeEntityRepository
            .createQueryBuilder("trade")
            .leftJoinAndSelect("trade.project", "project")
            .leftJoinAndSelect("trade.type", "type")
            .leftJoinAndSelect("project.category", "category")
            .leftJoinAndSelect("project.currency", "currency")
            .leftJoinAndSelect("trade.agentLand", "agentLand")
            .leftJoinAndSelect("trade.user", "user")
            .where("project.nftAddress = :nftAddress", { nftAddress })
            .andWhere("trade.tokenId = :tokenId", { tokenId })
            .getOne();
        if (!queryBuilder) {
            throw new common_1.HttpException("Failed to load data", common_1.HttpStatus.NOT_FOUND);
        }
        else {
            const _a = queryBuilder.user, { password, referralCode, referredBy, avatar, isKYC, isActive, id, createdAt, updatedAt, role } = _a, userData = __rest(_a, ["password", "referralCode", "referredBy", "avatar", "isKYC", "isActive", "id", "createdAt", "updatedAt", "role"]);
            let transactionData = await this.transactionService.getTransactionHash(queryBuilder.projectId, Number(queryBuilder.agentLand.tokenId));
            return { user: userData, transactions: transactionData };
        }
    }
    async update(id, updateTradeDto) {
        try {
            const queryBuilder = this.tradeEntityRepository.createQueryBuilder("trade");
            queryBuilder.where("trade.id = :id", { id });
            const data = await queryBuilder.getOne();
            if (!data) {
                throw new common_1.HttpException("Bad Request", common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                let transactionData = {
                    tokenId: Number(data.tokenId),
                    projectId: data.projectId,
                    tag: updateTradeDto.tag,
                    transactionHash: updateTradeDto.transactionHash,
                };
                const tradeData = Object.keys(updateTradeDto).reduce((object, key) => {
                    if (key !== "transactionHash" && key !== "tag") {
                        object[key] = updateTradeDto[key];
                    }
                    return object;
                }, {});
                if (updateTradeDto.transactionHash) {
                    await this.updateById(id, tradeData);
                    const transactionEntity = this.transactionEntityRepository.create(transactionData);
                    await this.transactionEntityRepository.save(transactionEntity);
                }
                else {
                    await this.updateById(id, tradeData);
                }
                return {
                    status: common_1.HttpStatus.OK,
                    statusText: "Record Updated",
                };
            }
        }
        catch (error) {
            throw new common_1.HttpException("Failed", common_1.HttpStatus.BAD_GATEWAY);
        }
    }
};
TradeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(trade_entity_1.TradeEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(transaction_entity_1.TransactionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        transaction_service_1.TransactionService])
], TradeService);
exports.TradeService = TradeService;
//# sourceMappingURL=trade.service.js.map