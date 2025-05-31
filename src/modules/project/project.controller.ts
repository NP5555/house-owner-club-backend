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
  HttpException,
  Req,
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
import { RoleType } from "../../constants";

@Controller("project")
@ApiTags("project")
export class ProjectController {
  constructor(readonly service: ProjectService) {}

  @Post()
  @Auth([RoleType.DEVELOPER])
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

  // Admin endpoint to create projects for public viewing
  @Post("admin")
  @Auth([RoleType.ADMIN])
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Admin creation of project for public viewing",
    type: CreateProjectDto,
  })
  async adminCreate(@Body() CreateProjectDto: CreateProjectDto) {
    // For admin projects, we'll set a special flag or use a specific developerId
    // to indicate these are admin-created public projects
    const projectCreated = await this.service.save(CreateProjectDto);
    
    // Create default page options for getting all projects
    const defaultPageOptions = new PageOptionsDto();
    
    const allProjects = await this.service.findAllPublicProjects(defaultPageOptions);
    return { 
      projectCreated, 
      allProjects,
      message: "Project created successfully for public viewing"
    };
  }

  @Get()
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

  // Admin endpoint to get all projects for management
  @Get("admin/all")
  @Auth([RoleType.ADMIN])
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get all projects for admin management",
    type: CreateProjectDto,
    isArray: true,
  })
  async adminFindAll(
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

  // Public endpoint for users to view all projects (including admin-created)
  @Get("public")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get public projects visible to all users",
    type: CreateProjectDto,
    isArray: true,
  })
  async findPublicProjects(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
    @Res() res: any
  ) {
    const result = await this.service.findAllPublicProjects(pageOptionsDto);
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Public projects found",
      data: result,
    });
    return result;
  }

  @Get("/developerId")
  @Auth([RoleType.DEVELOPER, RoleType.ADMIN])
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
    @Req() req: any,
    @Res() res: any
  ): Promise<PageDto<ProjectDto>> {
    try {
      // Get developer ID from query or authenticated user
      let effectiveDeveloperId = developerId;
      
      // Clean up the developerId - handle 'undefined' string and empty string
      if (!effectiveDeveloperId || effectiveDeveloperId === 'undefined' || effectiveDeveloperId.trim() === '') {
        // Try to get from authenticated user
        if (req.user && req.user.id) {
          effectiveDeveloperId = req.user.id;
          console.log('Using developer ID from authenticated user:', effectiveDeveloperId);
        } else {
          console.log('No developer ID found in request or user context');
          return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: "Developer ID is required",
            error: "No developer ID found in request or user context",
            data: {
              data: [],
              meta: {
                totalItems: 0,
                itemCount: 0,
                itemsPerPage: pageOptionsDto.take,
                totalPages: 0,
                currentPage: pageOptionsDto.page
              }
            }
          });
        }
      }

      console.log('Fetching projects for developer:', effectiveDeveloperId);
      const projects = await this.service.findAllByDeveloperId(
        effectiveDeveloperId,
        pageOptionsDto
      );
      
      // If no projects found, return empty array with pagination
      if (!projects || !projects.data || projects.data.length === 0) {
        return res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          message: "No projects found",
          data: {
            data: [],
            meta: {
              totalItems: 0,
              itemCount: 0,
              itemsPerPage: pageOptionsDto.take,
              totalPages: 0,
              currentPage: pageOptionsDto.page
            }
          }
        });
      }

      // Return found projects
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "Records Found",
        data: projects
      });
    } catch (error) {
      console.error('Error in findByUserId:', error);
      
      if (error instanceof HttpException) {
        return res.status(error.getStatus()).json({
          status: error.getStatus(),
          message: error.message,
          error: error.name,
          data: {
            data: [],
            meta: {
              totalItems: 0,
              itemCount: 0,
              itemsPerPage: pageOptionsDto.take,
              totalPages: 0,
              currentPage: pageOptionsDto.page
            }
          }
        });
      }
      
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
        error: error.message,
        data: {
          data: [],
          meta: {
            totalItems: 0,
            itemCount: 0,
            itemsPerPage: pageOptionsDto.take,
            totalPages: 0,
            currentPage: pageOptionsDto.page
          }
        }
      });
    }
  }

  @Get(":id")
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
  @Auth([RoleType.ADMIN, RoleType.DEVELOPER])
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
  @Auth([RoleType.ADMIN, RoleType.DEVELOPER])
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Delete project",
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
