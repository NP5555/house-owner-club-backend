import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { TypeDto } from "./dto/type.dto";
import { TypeEntity } from "./entities/type.entity";
import { CreateTypeDto } from "./dto/create-type.dto";
import { AbstractService } from "../../common/abstract.service";

@Injectable()
export class TypeService extends AbstractService<TypeEntity> {
  constructor(
    @InjectRepository(TypeEntity)
    private typeEntityRepository: Repository<TypeEntity>
  ) {
    super(typeEntityRepository);
  }

  async findMaxBlockchainIdByProjectId(projectId: Uuid): Promise<number> {
    const result = await this.typeEntityRepository
      .createQueryBuilder("type")
      .select("MAX(type.blockchainId)", "maxBlockchainId")
      .where("type.projectId = :projectId", { projectId })
      .getRawOne();

    return result.maxBlockchainId;
  }

  async save(createTypeDto: CreateTypeDto) {
    const typeEntity = this.typeEntityRepository.create(createTypeDto);
    const currentMaxBlockchainId = await this.findMaxBlockchainIdByProjectId(
      typeEntity.projectId
    );

    typeEntity.blockchainId = currentMaxBlockchainId + 1;

    await this.typeEntityRepository.save(typeEntity);
    return typeEntity;
  }

  async findAllPageOptions(
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<TypeDto>> {
    const queryBuilder = this.typeEntityRepository.createQueryBuilder("Type");
    queryBuilder.leftJoinAndSelect("Type.project", "project");

    if (!!pageOptionsDto.q) {
      queryBuilder.where("Type.name like :search", {
        search: `%${pageOptionsDto.q}%`,
      });
    }
    if (!!pageOptionsDto.order) {
      queryBuilder.orderBy("Type.createdAt", pageOptionsDto.order);
    }
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
    if (items.length > 0) {
      return items.toPageDto(pageMetaDto);
    } else {
      throw new HttpException("Failed to load data", HttpStatus.NOT_FOUND);
    }
  }
}
