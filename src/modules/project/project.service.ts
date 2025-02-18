import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { ProjectDto } from "./dto/project.dto";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { ProjectEntity } from "./entities/project.entity";
import { CreateProjectDto } from "./dto/create-project.dto";
import { AbstractService } from "../../common/abstract.service";

@Injectable()
export class ProjectService extends AbstractService<ProjectEntity> {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectEntityRepository: Repository<ProjectEntity>
  ) {
    super(projectEntityRepository);
  }

  async save(createProjectDto: CreateProjectDto) {
    const projectEntity = this.projectEntityRepository.create(createProjectDto);
    await this.projectEntityRepository.save(projectEntity);

    return projectEntity;
  }
  async findAllPageOptions(
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<ProjectDto>> {
    const queryBuilder =
      this.projectEntityRepository.createQueryBuilder("project");
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
    } else {
      throw new HttpException("Failed to load data", HttpStatus.NOT_FOUND);
    }
  }

  async findAllByDeveloperId(
    developerId: string,
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<ProjectDto>> {
    const queryBuilder =
      this.projectEntityRepository.createQueryBuilder("project");
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
    } else {
      throw new HttpException("Failed to load data", HttpStatus.NOT_FOUND);
    }
  }
}
