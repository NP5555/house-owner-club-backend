import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Patch,
  Post,
  Query,
  Res,
  ValidationPipe,
} from "@nestjs/common";
import { AgentLandService } from "./agent-land.service";
import { UUIDParam } from "../../decorators";
// import { AbilitiesGuard } from "../../guards/abilities.guard";
// import { CheckPolicies } from "../ability/decorators/check-policies.decorator";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AgentLandDto } from "./dto/agent-land.dto";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { CreateAgentLandDto } from "./dto/create-agent-land.dto";
import { UpdateAgentLandDto } from "./dto/update-agent-land.dto";
import { CreateBulkAgentLandDto } from "./dto/create-bulk-agent-land.dto";

@Controller("agent-land")
@ApiTags("agent-land")
export class AgentLandController {
  constructor(readonly service: AgentLandService) {}

  @Post()
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(AgentLandManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Registration of AgentLand",
    type: CreateAgentLandDto,
  })
  async create(@Body() createAgentLandDto: CreateAgentLandDto) {
    const event = await this.service.save(createAgentLandDto);
    return event.toDto();
  }

  @Post("createBulk")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(AgentLandManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Registration bulk of AgentLand",
    type: CreateBulkAgentLandDto,
  })
  async createBulk(@Body() createBulkAgentLandDto: CreateBulkAgentLandDto) {
    return this.service.saveBulk(createBulkAgentLandDto);
  }
  @Get()
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(AgentLandManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get AgentLands",
    type: CreateAgentLandDto,
    isArray: true,
  })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
    @Res() res: any
  ): Promise<PageDto<AgentLandDto>> {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Record Found",
      data: await this.service.findAllPageOptions(pageOptionsDto),
    });
    return this.service.findAllPageOptions(pageOptionsDto);
  }

  @Get(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(AgentLandManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get AgentLand by Id",
    type: AgentLandDto,
  })
  async findOne(@UUIDParam("id") id: Uuid, @Res() res: any) {
    const AgentLand = await this.service.findOneLand(id);
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Records Found",
      data: AgentLand,
    });
    return AgentLand.toDto();
  }

  @Patch(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(AgentLandManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Update AgentLand by Id",
    type: UpdateResult,
  })
  async update(
    @UUIDParam("id") id: Uuid,
    @Body() updateAgentLandDto: UpdateAgentLandDto
  ) {
    const agentLand = await this.service.findOne({ id });
    if (!agentLand) {
      throw new NotFoundException();
    }
    return this.service.updateById(id, updateAgentLandDto);
  }

  @Delete(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(AgentLandManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Delete event",
    type: DeleteResult,
  })
  async remove(@UUIDParam("id") id: Uuid) {
    const AgentLand = await this.service.findOne({ id });
    if (!AgentLand) {
      throw new NotFoundException();
    }
    const deletedAgentLand = await this.service.delete(id);
    const allAgentLands = await this.service.findAll();
    return { deletedAgentLand, allAgentLands };
  }
}
