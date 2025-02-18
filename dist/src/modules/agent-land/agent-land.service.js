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
exports.AgentLandService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const agent_land_entity_1 = require("./entities/agent-land.entity");
const create_agent_land_dto_1 = require("./dto/create-agent-land.dto");
const abstract_service_1 = require("../../common/abstract.service");
const create_bulk_agent_land_dto_1 = require("./dto/create-bulk-agent-land.dto");
const typeorm_transactional_1 = require("typeorm-transactional");
let AgentLandService = class AgentLandService extends abstract_service_1.AbstractService {
    constructor(AgentLandEntityRepository) {
        super(AgentLandEntityRepository);
        this.AgentLandEntityRepository = AgentLandEntityRepository;
    }
    async save(createAgentLandDto) {
        const agentLandEntity = this.AgentLandEntityRepository.create(createAgentLandDto);
        await this.AgentLandEntityRepository.save(agentLandEntity);
        return agentLandEntity;
    }
    async saveBulk(createBulkAgentLandDto) {
        for (let i = createBulkAgentLandDto.startTokenId; i < createBulkAgentLandDto.startTokenId + createBulkAgentLandDto.count; i++) {
            const createAgentLandDto = new create_agent_land_dto_1.CreateAgentLandDto();
            createAgentLandDto.tokenId = i.toString();
            (createAgentLandDto.typeId = createBulkAgentLandDto.typeId),
                (createAgentLandDto.projectId = createBulkAgentLandDto.projectId),
                (createAgentLandDto.agentId = createBulkAgentLandDto.agentId);
            createAgentLandDto.developerId = createBulkAgentLandDto.developerId;
            createAgentLandDto.landImage = createBulkAgentLandDto.landImage;
            createAgentLandDto.youtubeLinks = createBulkAgentLandDto.youtubeLinks;
            const agentLandEntity = this.AgentLandEntityRepository.create(createAgentLandDto);
            await this.AgentLandEntityRepository.save(agentLandEntity);
        }
        return agent_land_entity_1.AgentLandEntity;
    }
    async findAllPageOptions(pageOptionsDto) {
        const queryBuilder = this.AgentLandEntityRepository.createQueryBuilder("AgentLand");
        queryBuilder.leftJoinAndSelect("AgentLand.user", "user");
        queryBuilder.leftJoinAndSelect("AgentLand.project", "project");
        queryBuilder.leftJoinAndSelect("AgentLand.type", "type");
        queryBuilder.leftJoinAndSelect("project.currency", "currency");
        queryBuilder.leftJoinAndSelect("project.category", "category");
        if (!!pageOptionsDto.q) {
            queryBuilder.where("project.name like :search", {
                search: `%${pageOptionsDto.q}%`,
            });
        }
        if (!!pageOptionsDto.order) {
            queryBuilder.orderBy("project.createdAt", pageOptionsDto.order);
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
        const queryBuilder = this.AgentLandEntityRepository.createQueryBuilder("AgentLand")
            .leftJoinAndSelect("AgentLand.project", "project")
            .leftJoinAndSelect("AgentLand.type", "type")
            .leftJoinAndSelect("project.category", "category")
            .leftJoinAndSelect("project.currency", "currency")
            .leftJoinAndSelect("AgentLand.user", "user")
            .where("AgentLand.id = :id", { id })
            .getOne();
        if (!queryBuilder) {
            throw new common_1.HttpException("Failed to load data", common_1.HttpStatus.NOT_FOUND);
        }
        return queryBuilder;
    }
};
__decorate([
    (0, typeorm_transactional_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bulk_agent_land_dto_1.CreateBulkAgentLandDto]),
    __metadata("design:returntype", Promise)
], AgentLandService.prototype, "saveBulk", null);
AgentLandService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(agent_land_entity_1.AgentLandEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AgentLandService);
exports.AgentLandService = AgentLandService;
//# sourceMappingURL=agent-land.service.js.map