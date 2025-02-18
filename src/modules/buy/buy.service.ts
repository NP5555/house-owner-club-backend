import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { BuyDto } from "./dto/buy.dto";
import { BuyEntity } from "./entities/buy.entity";
import { CreateBuyDto } from "./dto/create-buy.dto";
import { AbstractService } from "../../common/abstract.service";

@Injectable()
export class BuyService extends AbstractService<BuyEntity> {
  constructor(
    @InjectRepository(BuyEntity)
    private buyEntityRepository: Repository<BuyEntity>
  ) {
    super(buyEntityRepository);
  }

  async save(createBuyDto: CreateBuyDto) {
    const buyEntity = this.buyEntityRepository.create(createBuyDto);
    await this.buyEntityRepository.save(buyEntity);
    return buyEntity;
  }

  async findAllPageOptions(
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<BuyDto>> {
    const queryBuilder = this.buyEntityRepository.createQueryBuilder("buy");
    queryBuilder.leftJoinAndSelect("buy.project", "project");
    queryBuilder.leftJoinAndSelect("project.category", "category");
    queryBuilder.leftJoinAndSelect("project.currency", "currency");
    queryBuilder.leftJoinAndSelect("buy.type", "type");
    queryBuilder.leftJoinAndSelect("buy.agentLand", "agentLand");
    queryBuilder.leftJoinAndSelect("buy.user", "user");

    if (!!pageOptionsDto.q) {
      queryBuilder.where("buy.name like :search", {
        search: `%${pageOptionsDto.q}%`,
      });
    }
    if (!!pageOptionsDto.order) {
      queryBuilder.orderBy("buy.createdAt", pageOptionsDto.order);
    }

    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
    if (items.length > 0) {
      return items.toPageDto(pageMetaDto);
    } else {
      throw new HttpException("Failed to load data", HttpStatus.NOT_FOUND);
    }
  }

  async findAllByUserId(
    userId: string,
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<BuyDto>> {
    const queryBuilder = this.buyEntityRepository.createQueryBuilder("buy");
    queryBuilder.leftJoinAndSelect("buy.project", "project");
    queryBuilder.leftJoinAndSelect("project.category", "category");
    queryBuilder.leftJoinAndSelect("project.currency", "currency");
    queryBuilder.leftJoinAndSelect("buy.type", "type");
    queryBuilder.leftJoinAndSelect("buy.agentLand", "agent_land");
    queryBuilder.leftJoinAndSelect("buy.user", "user");
    queryBuilder.andWhere("user.id = :userId", { userId });

    if (!!pageOptionsDto.q) {
      queryBuilder.where("buy.name like :search", {
        search: `%${pageOptionsDto.q}%`,
      });
    }
    if (!!pageOptionsDto.order) {
      queryBuilder.orderBy("buy.createdAt", pageOptionsDto.order);
    }
    // Add a condition to filter by userId

    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    if (items.length > 0) {
      return items.toPageDto(pageMetaDto);
    } else {
      throw new HttpException("Failed to load data", HttpStatus.NOT_FOUND);
    }
  }

  async findOneLand(id: Uuid): Promise<any> {
    const queryBuilder = this.buyEntityRepository
      .createQueryBuilder("buy")
      .leftJoinAndSelect("buy.project", "project")
      .leftJoinAndSelect("project.category", "category")
      .leftJoinAndSelect("project.currency", "currency")
      .leftJoinAndSelect("buy.type", "type")
      .leftJoinAndSelect("buy.agentLand", "agentLand")
      .leftJoinAndSelect("buy.user", "user")
      .where("buy.id = :id", { id })
      .getOne();

    if (!queryBuilder) {
      throw new HttpException("Failed to load data", HttpStatus.NOT_FOUND);
    }

    return queryBuilder;
  }
}
