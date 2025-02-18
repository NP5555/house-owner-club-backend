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
import { ProjectService } from "./project.service";
import { Auth, UUIDParam } from "../../decorators";
// import { AbilitiesGuard } from "../../guards/abilities.guard";
// import { CheckPolicies } from "../ability/decorators/check-policies.decorator";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProjectDto } from "./dto/project.dto";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Controller("project")
@ApiTags("project")
export class ProjectController {
  constructor(readonly service: ProjectService) {}

  @Post()
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(ProjectManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Registration of project",
    type: CreateProjectDto,
  })
  async create(@Body() CreateProjectDto: CreateProjectDto) {
    const projectCreated = await this.service.save(CreateProjectDto);
    const allProjects = await this.service.findAll();
    return { projectCreated, allProjects };
  }

  @Get()
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(ProjectManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get projects",
    type: CreateProjectDto,
    isArray: true,
  })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
    @Res() res: any
  ): Promise<PageDto<ProjectDto>> {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Record Found",
      data: await this.service.findAllPageOptions(pageOptionsDto),
    });
    return this.service.findAllPageOptions(pageOptionsDto);
  }

  @Get("/developerId")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(BuyManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get projects",
    type: CreateProjectDto,
    isArray: true,
  })
  async findByUserId(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
    @Query("developerId") developerId: string,
    @Res() res: any
  ): Promise<PageDto<ProjectDto>> {
    const tradeLands = await this.service.findAllByDeveloperId(
      developerId,
      pageOptionsDto
    );
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Records Found",
      data: tradeLands,
    });
    return tradeLands;
  }

  @Get(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(ProjectManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get project by Id",
    type: ProjectDto,
  })
  async findOne(@UUIDParam("id") id: Uuid) {
    const project = await this.service.findOne({ id });
    if (!project) {
      throw new NotFoundException();
    }
    return project.toDto();
  }

  @Patch(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(ProjectManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Update project by Id",
    type: UpdateResult,
  })
  async update(
    @UUIDParam("id") id: Uuid,
    @Body() updateProjectDto: UpdateProjectDto
  ) {
    const project = await this.service.findOne({ id });
    if (!project) {
      throw new NotFoundException();
    }
    return this.service.updateById(id, updateProjectDto);
  }

  @Delete(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(ProjectManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Delete event",
    type: DeleteResult,
  })
  async remove(@UUIDParam("id") id: Uuid) {
    const project = await this.service.findOne({ id });
    if (!project) {
      throw new NotFoundException();
    }
    const deleteProject = await this.service.delete(id);
    const allProjects = await this.service.findAll();
    return { deleteProject, allProjects };
  }
}
