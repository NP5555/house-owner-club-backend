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
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
const decorators_1 = require("../../decorators");
const swagger_1 = require("@nestjs/swagger");
const project_dto_1 = require("./dto/project.dto");
const page_options_dto_1 = require("../../common/dto/page-options.dto");
const UpdateResult_1 = require("typeorm/query-builder/result/UpdateResult");
const DeleteResult_1 = require("typeorm/query-builder/result/DeleteResult");
const create_project_dto_1 = require("./dto/create-project.dto");
const update_project_dto_1 = require("./dto/update-project.dto");
let ProjectController = class ProjectController {
    constructor(service) {
        this.service = service;
    }
    async create(CreateProjectDto) {
        const projectCreated = await this.service.save(CreateProjectDto);
        const allProjects = await this.service.findAll();
        return { projectCreated, allProjects };
    }
    async findAll(pageOptionsDto, res) {
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Record Found",
            data: await this.service.findAllPageOptions(pageOptionsDto),
        });
        return this.service.findAllPageOptions(pageOptionsDto);
    }
    async findByUserId(pageOptionsDto, developerId, res) {
        const tradeLands = await this.service.findAllByDeveloperId(developerId, pageOptionsDto);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Records Found",
            data: tradeLands,
        });
        return tradeLands;
    }
    async findOne(id) {
        const project = await this.service.findOne({ id });
        if (!project) {
            throw new common_1.NotFoundException();
        }
        return project.toDto();
    }
    async update(id, updateProjectDto) {
        const project = await this.service.findOne({ id });
        if (!project) {
            throw new common_1.NotFoundException();
        }
        return this.service.updateById(id, updateProjectDto);
    }
    async remove(id) {
        const project = await this.service.findOne({ id });
        if (!project) {
            throw new common_1.NotFoundException();
        }
        const deleteProject = await this.service.delete(id);
        const allProjects = await this.service.findAll();
        return { deleteProject, allProjects };
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: "Registration of project",
        type: create_project_dto_1.CreateProjectDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get projects",
        type: create_project_dto_1.CreateProjectDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("/developerId"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get projects",
        type: create_project_dto_1.CreateProjectDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)("developerId")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto, String, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get project by Id",
        type: project_dto_1.ProjectDto,
    }),
    __param(0, (0, decorators_1.UUIDParam)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Update project by Id",
        type: UpdateResult_1.UpdateResult,
    }),
    __param(0, (0, decorators_1.UUIDParam)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "update", null);
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
], ProjectController.prototype, "remove", null);
ProjectController = __decorate([
    (0, common_1.Controller)("project"),
    (0, swagger_1.ApiTags)("project"),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map