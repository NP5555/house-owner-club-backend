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
exports.RentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rent_entity_1 = require("./entities/rent.entity");
const abstract_service_1 = require("../../common/abstract.service");
const transaction_entity_1 = require("../transactions/entities/transaction.entity");
let RentService = class RentService extends abstract_service_1.AbstractService {
    constructor(rentEntityRepository, transactionEntityRepository) {
        super(rentEntityRepository);
        this.rentEntityRepository = rentEntityRepository;
        this.transactionEntityRepository = transactionEntityRepository;
    }
    async save(createTradeDto) {
        const tradeEntity = this.rentEntityRepository.create(createTradeDto);
        await this.rentEntityRepository.save(tradeEntity);
        return tradeEntity;
    }
    async findAllPageOptions(pageOptionsDto) {
        const queryBuilder = this.rentEntityRepository.createQueryBuilder("rent");
        queryBuilder.leftJoinAndSelect("rent.project", "project");
        queryBuilder.leftJoinAndSelect("rent.currency", "currency");
        queryBuilder.leftJoinAndSelect("project.category", "category");
        queryBuilder.leftJoinAndSelect("rent.agentLand", "agentLand");
        queryBuilder.leftJoinAndSelect("rent.owner", "owner");
        const hasTenantId = this.rentEntityRepository.metadata.columns.some((column) => column.propertyName === "tenantId");
        if (hasTenantId === true) {
            queryBuilder.leftJoinAndSelect("rent.tenant", "tenant");
        }
        if (!!pageOptionsDto.q) {
            queryBuilder.where("rent.name like :search", {
                search: `%${pageOptionsDto.q}%`,
            });
        }
        if (!!pageOptionsDto.order) {
            queryBuilder.orderBy("rent.createdAt", !pageOptionsDto.order ? "DESC" : pageOptionsDto.order);
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
        const queryBuilder = this.rentEntityRepository.createQueryBuilder("trade");
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
            queryBuilder.orderBy("trade.createdAt", !pageOptionsDto.order ? "DESC" : pageOptionsDto.order);
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
        const queryBuilder = this.rentEntityRepository.createQueryBuilder("trade");
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
        const queryBuilder = await this.rentEntityRepository
            .createQueryBuilder("rent")
            .leftJoinAndSelect("rent.project", "project")
            .leftJoinAndSelect("project.category", "category")
            .leftJoinAndSelect("rent.currency", "currency")
            .leftJoinAndSelect("rent.agentLand", "agentLand")
            .leftJoinAndSelect("rent.owner", "owner")
            .leftJoinAndSelect("rent.tenant", "tenant")
            .where("rent.id = :id", { id })
            .getOne();
        if (!queryBuilder) {
            throw new common_1.HttpException("Record not found", common_1.HttpStatus.NOT_FOUND);
        }
        return queryBuilder;
    }
    async update(id, updateRentDto) {
        try {
            const queryBuilder = this.rentEntityRepository.createQueryBuilder("rent");
            queryBuilder.where("rent.id = :id", { id });
            const data = await queryBuilder.getOne();
            if (!data) {
                throw new common_1.HttpException("Bad Request", common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                let transactionData = {
                    tokenId: Number(data.tokenId),
                    projectId: data.projectId,
                    tag: updateRentDto.tag,
                    transactionHash: updateRentDto.transactionHash,
                };
                const rentData = Object.keys(updateRentDto).reduce((object, key) => {
                    if (key !== "transactionHash" && key !== "tag") {
                        object[key] = updateRentDto[key];
                    }
                    return object;
                }, {});
                if (updateRentDto.transactionHash) {
                    await this.updateById(id, rentData);
                    const transactionEntity = this.transactionEntityRepository.create(transactionData);
                    await this.transactionEntityRepository.save(transactionEntity);
                }
                else {
                    await this.updateById(id, rentData);
                }
                return {
                    status: common_1.HttpStatus.OK,
                    statusText: "Record Updated",
                };
            }
        }
        catch (error) {
            throw new common_1.HttpException("BAD GATEWAY", common_1.HttpStatus.BAD_GATEWAY);
        }
    }
};
RentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rent_entity_1.RentEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(transaction_entity_1.TransactionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RentService);
exports.RentService = RentService;
//# sourceMappingURL=rent.service.js.map