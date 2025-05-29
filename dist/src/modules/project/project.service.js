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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("./entities/project.entity");
const abstract_service_1 = require("../../common/abstract.service");
let ProjectService = class ProjectService extends abstract_service_1.AbstractService {
    constructor(projectEntityRepository) {
        super(projectEntityRepository);
        this.projectEntityRepository = projectEntityRepository;
    }
    async save(createProjectDto) {
        const projectEntity = this.projectEntityRepository.create(createProjectDto);
        await this.projectEntityRepository.save(projectEntity);
        return projectEntity;
    }
    async findAllPageOptions(pageOptionsDto) {
        const queryBuilder = this.projectEntityRepository.createQueryBuilder("project");
        queryBuilder.leftJoinAndSelect("project.category", "category");
        queryBuilder.leftJoinAndSelect("project.currency", "currency");
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
    async findAllPublicProjects(pageOptionsDto) {
        const queryBuilder = this.projectEntityRepository.createQueryBuilder("project");
        queryBuilder.leftJoinAndSelect("project.category", "category");
        queryBuilder.leftJoinAndSelect("project.currency", "currency");
        queryBuilder.where("project.status = :status", { status: 'OPEN' });
        if (pageOptionsDto) {
            if (!!pageOptionsDto.q) {
                queryBuilder.andWhere("project.name like :search", {
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
                return { data: [], meta: pageMetaDto };
            }
        }
        else {
            const items = await queryBuilder.getMany();
            return items.map(item => item.toDto());
        }
    }
    async findAllByDeveloperId(developerId, pageOptionsDto) {
        const queryBuilder = this.projectEntityRepository.createQueryBuilder("project");
        queryBuilder.leftJoinAndSelect("project.category", "category");
        queryBuilder.leftJoinAndSelect("project.currency", "currency");
        queryBuilder.andWhere("project.developerId = :developerId", {
            developerId,
        });
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
};
ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.ProjectEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map