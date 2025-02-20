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
exports.AgentLandController = void 0;
const common_1 = require("@nestjs/common");
const agent_land_service_1 = require("./agent-land.service");
const decorators_1 = require("../../decorators");
const swagger_1 = require("@nestjs/swagger");
const agent_land_dto_1 = require("./dto/agent-land.dto");
const page_options_dto_1 = require("../../common/dto/page-options.dto");
const UpdateResult_1 = require("typeorm/query-builder/result/UpdateResult");
const DeleteResult_1 = require("typeorm/query-builder/result/DeleteResult");
const create_agent_land_dto_1 = require("./dto/create-agent-land.dto");
const update_agent_land_dto_1 = require("./dto/update-agent-land.dto");
const create_bulk_agent_land_dto_1 = require("./dto/create-bulk-agent-land.dto");
let AgentLandController = class AgentLandController {
    constructor(service) {
        this.service = service;
    }
    async create(createAgentLandDto) {
        const event = await this.service.save(createAgentLandDto);
        return event.toDto();
    }
    async createBulk(createBulkAgentLandDto) {
        return this.service.saveBulk(createBulkAgentLandDto);
    }
    async findAll(pageOptionsDto, res) {
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Record Found",
            data: await this.service.findAllPageOptions(pageOptionsDto),
        });
        return this.service.findAllPageOptions(pageOptionsDto);
    }
    async findOne(id, res) {
        const AgentLand = await this.service.findOneLand(id);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Records Found",
            data: AgentLand,
        });
        return AgentLand.toDto();
    }
    async update(id, updateAgentLandDto) {
        const agentLand = await this.service.findOne({ id });
        if (!agentLand) {
            throw new common_1.NotFoundException();
        }
        return this.service.updateById(id, updateAgentLandDto);
    }
    async remove(id) {
        const AgentLand = await this.service.findOne({ id });
        if (!AgentLand) {
            throw new common_1.NotFoundException();
        }
        const deletedAgentLand = await this.service.delete(id);
        const allAgentLands = await this.service.findAll();
        return { deletedAgentLand, allAgentLands };
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: "Registration of AgentLand",
        type: create_agent_land_dto_1.CreateAgentLandDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_agent_land_dto_1.CreateAgentLandDto]),
    __metadata("design:returntype", Promise)
], AgentLandController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("createBulk"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: "Registration bulk of AgentLand",
        type: create_bulk_agent_land_dto_1.CreateBulkAgentLandDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bulk_agent_land_dto_1.CreateBulkAgentLandDto]),
    __metadata("design:returntype", Promise)
], AgentLandController.prototype, "createBulk", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get AgentLands",
        type: create_agent_land_dto_1.CreateAgentLandDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], AgentLandController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get AgentLand by Id",
        type: agent_land_dto_1.AgentLandDto,
    }),
    __param(0, (0, decorators_1.UUIDParam)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AgentLandController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Update AgentLand by Id",
        type: UpdateResult_1.UpdateResult,
    }),
    __param(0, (0, decorators_1.UUIDParam)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_agent_land_dto_1.UpdateAgentLandDto]),
    __metadata("design:returntype", Promise)
], AgentLandController.prototype, "update", null);
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
], AgentLandController.prototype, "remove", null);
AgentLandController = __decorate([
    (0, common_1.Controller)("agent-land"),
    (0, swagger_1.ApiTags)("agent-land"),
    __metadata("design:paramtypes", [agent_land_service_1.AgentLandService])
], AgentLandController);
exports.AgentLandController = AgentLandController;
//# sourceMappingURL=agent-land.controller.js.map