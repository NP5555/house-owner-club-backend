import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { RentDto } from "./dto/rent.dto";
import { RentEntity } from "./entities/rent.entity";
import { CreateRentDto } from "./dto/create-rent.dto";
import { AbstractService } from "../../common/abstract.service";
import { UpdateRentDto } from "./dto/update-rent.dto";
import { TransactionEntity } from "../transactions/entities/transaction.entity";

@Injectable()
export class RentService extends AbstractService<RentEntity> {
  constructor(
    @InjectRepository(RentEntity)
    private rentEntityRepository: Repository<RentEntity>,
    @InjectRepository(TransactionEntity)
    private transactionEntityRepository: Repository<TransactionEntity>,
  ) {
    super(rentEntityRepository);
  }

  async save(createTradeDto: CreateRentDto) {
    const tradeEntity = this.rentEntityRepository.create(createTradeDto);
    await this.rentEntityRepository.save(tradeEntity);
    return tradeEntity;
  }

  async findAllPageOptions(
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<RentDto>> {
    const queryBuilder = this.rentEntityRepository.createQueryBuilder("rent");
    queryBuilder.leftJoinAndSelect("rent.project", "project");
    queryBuilder.leftJoinAndSelect("rent.currency", "currency");
    queryBuilder.leftJoinAndSelect("project.category", "category");
    queryBuilder.leftJoinAndSelect("rent.agentLand", "agentLand");
    queryBuilder.leftJoinAndSelect("rent.owner", "owner");

    const hasTenantId = this.rentEntityRepository.metadata.columns.some(
      (column) => column.propertyName === "tenantId"
    );

    if (hasTenantId === true) {
      queryBuilder.leftJoinAndSelect("rent.tenant", "tenant");
    }

    if (!!pageOptionsDto.q) {
      queryBuilder.where("rent.name like :search", {
        search: `%${pageOptionsDto.q}%`,
      });
    }
    if (!!pageOptionsDto.order) {
      queryBuilder.orderBy(
        "rent.createdAt",
        !pageOptionsDto.order ? "DESC" : pageOptionsDto.order
      );
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
  ): Promise<PageDto<RentDto>> {
    const queryBuilder = this.rentEntityRepository.createQueryBuilder("trade");
    queryBuilder.leftJoinAndSelect("trade.project", "project");
    queryBuilder.leftJoinAndSelect("trade.type", "type");
    queryBuilder.leftJoinAndSelect("project.category", "category");
    queryBuilder.leftJoinAndSelect("project.currency", "currency");
    queryBuilder.leftJoinAndSelect("trade.agentLand", "agent_land");
    queryBuilder.leftJoinAndSelect("trade.user", "user");
    queryBuilder.andWhere("user.id = :userId", { userId });

    if (!!pageOptionsDto.q) {
      queryBuilder.where("trade.name like :search", {
        search: `%${pageOptionsDto.q}%`,
      });
    }
    if (!!pageOptionsDto.order) {
      queryBuilder.orderBy(
        "trade.createdAt",
        !pageOptionsDto.order ? "DESC" : pageOptionsDto.order
      );
    }

    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    if (items.length > 0) {
      return items.toPageDto(pageMetaDto);
    } else {
      throw new HttpException("Failed to load data", HttpStatus.NOT_FOUND);
    }
  }

  async findAllByBuyerId(
    buyerId: string,
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<RentDto>> {
    const queryBuilder = this.rentEntityRepository.createQueryBuilder("trade");
    queryBuilder.leftJoinAndSelect("trade.project", "project");
    queryBuilder.leftJoinAndSelect("trade.type", "type");
    queryBuilder.leftJoinAndSelect("project.category", "category");
    queryBuilder.leftJoinAndSelect("project.currency", "currency");
    queryBuilder.leftJoinAndSelect("trade.agentLand", "agent_land");
    queryBuilder.leftJoinAndSelect("trade.user", "user");
    queryBuilder.andWhere("trade.buyerId = :buyerId", { buyerId });

    if (!!pageOptionsDto.q) {
      queryBuilder.where("trade.name like :search", {
        search: `%${pageOptionsDto.q}%`,
      });
    }
    if (!!pageOptionsDto.order) {
      queryBuilder.orderBy("trade.createdAt", pageOptionsDto.order);
    }

    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    if (items.length > 0) {
      return items.toPageDto(pageMetaDto);
    } else {
      throw new HttpException("Failed to load data", HttpStatus.NOT_FOUND);
    }
  }

  async findOneLand(id: Uuid): Promise<any> {
    const queryBuilder = await this.rentEntityRepository
      .createQueryBuilder("rent")
      .leftJoinAndSelect("rent.project", "project")
      .leftJoinAndSelect("project.category", "category")
      .leftJoinAndSelect("rent.currency", "currency")
      .leftJoinAndSelect("rent.agentLand", "agentLand")
      .leftJoinAndSelect("rent.owner", "owner")
      .leftJoinAndSelect("rent.tenant", "tenant")
      .where("rent.id = :id", { id })
      .getOne();
      
    if (!queryBuilder) {
      throw new HttpException("Record not found", HttpStatus.NOT_FOUND);
    }

    return queryBuilder;
  }

  async update(id: string, updateRentDto: UpdateRentDto): Promise<any> {
    try {
      const queryBuilder = this.rentEntityRepository.createQueryBuilder(
        "rent"
      );
      queryBuilder.where("rent.id = :id", { id });
      const data = await queryBuilder.getOne();
      if (!data) {
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
      } else {
        let transactionData = {
          tokenId: Number(data.tokenId),
          projectId: data.projectId,
          tag: updateRentDto.tag,
          transactionHash: updateRentDto.transactionHash,
        };

        const rentData = Object.keys(updateRentDto).reduce((object, key) => {
          if (key !== "transactionHash" && key !== "tag") {
            object[key] = updateRentDto[key];
          }
          return object;
        }, {});

        if (updateRentDto.transactionHash) {
          await this.updateById(id, rentData);
          const transactionEntity = this.transactionEntityRepository.create(
            transactionData
          );
          await this.transactionEntityRepository.save(transactionEntity);
        } else {
          await this.updateById(id, rentData);
        }

        return {
          status: HttpStatus.OK,
          statusText: "Record Updated",
        };
      }
    } catch (error) {
      throw new HttpException("BAD GATEWAY", HttpStatus.BAD_GATEWAY);
    }
  }
}
