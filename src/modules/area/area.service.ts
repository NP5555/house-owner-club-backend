import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { AreaDto } from "./dto/area.dto";
import { AreaEntity } from "./entities/area.entity";
import { CreateAreaDto } from "./dto/create-area.dto";
import { AbstractService } from "../../common/abstract.service";

@Injectable()
export class AreaService extends AbstractService<AreaEntity> {
  constructor(
    @InjectRepository(AreaEntity)
    private AreaEntityRepository: Repository<AreaEntity>
  ) {
    super(AreaEntityRepository);
  }

  async save(createAreaDto: CreateAreaDto) {
    const AreaEntity = this.AreaEntityRepository.create(createAreaDto);
    await this.AreaEntityRepository.save(AreaEntity);
    return AreaEntity;
  }

  async findAllPageOptions(
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<AreaDto>> {
    const queryBuilder = this.AreaEntityRepository.createQueryBuilder("Area");
    if (!!pageOptionsDto.q) {
      queryBuilder.where("Area.name like :search", {
        search: `%${pageOptionsDto.q}%`,
      });
    }
    if (!!pageOptionsDto.order) {
      queryBuilder.orderBy("Area.createdAt", pageOptionsDto.order);
    }
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
    return items.toPageDto(pageMetaDto);
  }
}
