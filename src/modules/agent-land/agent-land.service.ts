import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { AgentLandDto } from "./dto/agent-land.dto";
import { AgentLandEntity } from "./entities/agent-land.entity";
import { CreateAgentLandDto } from "./dto/create-agent-land.dto";
import { AbstractService } from "../../common/abstract.service";
import { CreateBulkAgentLandDto } from "./dto/create-bulk-agent-land.dto";
import { Transactional } from "typeorm-transactional";

@Injectable()
export class AgentLandService extends AbstractService<AgentLandEntity> {
  constructor(
    @InjectRepository(AgentLandEntity)
    private AgentLandEntityRepository: Repository<AgentLandEntity>
  ) {
    super(AgentLandEntityRepository);
  }

  async save(createAgentLandDto: CreateAgentLandDto) {
    const agentLandEntity =
      this.AgentLandEntityRepository.create(createAgentLandDto);
    await this.AgentLandEntityRepository.save(agentLandEntity);
    return agentLandEntity;
  }

  @Transactional()
  async saveBulk(createBulkAgentLandDto: CreateBulkAgentLandDto) {
    for (
      let i = createBulkAgentLandDto.startTokenId;
      i < createBulkAgentLandDto.startTokenId + createBulkAgentLandDto.count;
      i++
    ) {
      const createAgentLandDto = new CreateAgentLandDto();

      createAgentLandDto.tokenId = i.toString();
      (createAgentLandDto.typeId = createBulkAgentLandDto.typeId),
        (createAgentLandDto.projectId = createBulkAgentLandDto.projectId),
        (createAgentLandDto.agentId = createBulkAgentLandDto.agentId);
      createAgentLandDto.developerId = createBulkAgentLandDto.developerId;
      createAgentLandDto.landImage = createBulkAgentLandDto.landImage;
      createAgentLandDto.youtubeLinks = createBulkAgentLandDto.youtubeLinks;
      const agentLandEntity =
        this.AgentLandEntityRepository.create(createAgentLandDto);
      await this.AgentLandEntityRepository.save(agentLandEntity);
    }

    return AgentLandEntity;
  }

  async findAllPageOptions(
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<AgentLandDto>> {
    const queryBuilder =
      this.AgentLandEntityRepository.createQueryBuilder("AgentLand");
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
    } else {
      throw new HttpException("Failed to load data", HttpStatus.NOT_FOUND);
    }
  }

  async findOneLand(id: Uuid): Promise<any> {
    const queryBuilder = this.AgentLandEntityRepository.createQueryBuilder(
      "AgentLand"
    )
      .leftJoinAndSelect("AgentLand.project", "project")
      .leftJoinAndSelect("AgentLand.type", "type")
      .leftJoinAndSelect("project.category", "category")
      .leftJoinAndSelect("project.currency", "currency")
      .leftJoinAndSelect("AgentLand.user", "user")
      .where("AgentLand.id = :id", { id })
      .getOne();

    if (!queryBuilder) {
      throw new HttpException("Failed to load data", HttpStatus.NOT_FOUND);
    }

    return queryBuilder;
  }
}
