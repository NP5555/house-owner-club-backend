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
exports.BuyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const buy_entity_1 = require("./entities/buy.entity");
const abstract_service_1 = require("../../common/abstract.service");
let BuyService = class BuyService extends abstract_service_1.AbstractService {
    constructor(buyEntityRepository) {
        super(buyEntityRepository);
        this.buyEntityRepository = buyEntityRepository;
    }
    async save(createBuyDto) {
        const buyEntity = this.buyEntityRepository.create(createBuyDto);
        await this.buyEntityRepository.save(buyEntity);
        return buyEntity;
    }
    async findAllPageOptions(pageOptionsDto) {
        const queryBuilder = this.buyEntityRepository.createQueryBuilder("buy");
        queryBuilder.leftJoinAndSelect("buy.project", "project");
        queryBuilder.leftJoinAndSelect("project.category", "category");
        queryBuilder.leftJoinAndSelect("project.currency", "currency");
        queryBuilder.leftJoinAndSelect("buy.type", "type");
        queryBuilder.leftJoinAndSelect("buy.agentLand", "agentLand");
        queryBuilder.leftJoinAndSelect("buy.user", "user");
        if (!!pageOptionsDto.q) {
            queryBuilder.where("buy.name like :search", {
                search: `%${pageOptionsDto.q}%`,
            });
        }
        if (!!pageOptionsDto.order) {
            queryBuilder.orderBy("buy.createdAt", pageOptionsDto.order);
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
        const queryBuilder = this.buyEntityRepository.createQueryBuilder("buy");
        queryBuilder.leftJoinAndSelect("buy.project", "project");
        queryBuilder.leftJoinAndSelect("project.category", "category");
        queryBuilder.leftJoinAndSelect("project.currency", "currency");
        queryBuilder.leftJoinAndSelect("buy.type", "type");
        queryBuilder.leftJoinAndSelect("buy.agentLand", "agent_land");
        queryBuilder.leftJoinAndSelect("buy.user", "user");
        queryBuilder.andWhere("user.id = :userId", { userId });
        if (!!pageOptionsDto.q) {
            queryBuilder.where("buy.name like :search", {
                search: `%${pageOptionsDto.q}%`,
            });
        }
        if (!!pageOptionsDto.order) {
            queryBuilder.orderBy("buy.createdAt", pageOptionsDto.order);
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
        const queryBuilder = this.buyEntityRepository
            .createQueryBuilder("buy")
            .leftJoinAndSelect("buy.project", "project")
            .leftJoinAndSelect("project.category", "category")
            .leftJoinAndSelect("project.currency", "currency")
            .leftJoinAndSelect("buy.type", "type")
            .leftJoinAndSelect("buy.agentLand", "agentLand")
            .leftJoinAndSelect("buy.user", "user")
            .where("buy.id = :id", { id })
            .getOne();
        if (!queryBuilder) {
            throw new common_1.HttpException("Failed to load data", common_1.HttpStatus.NOT_FOUND);
        }
        return queryBuilder;
    }
};
BuyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(buy_entity_1.BuyEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BuyService);
exports.BuyService = BuyService;
//# sourceMappingURL=buy.service.js.map