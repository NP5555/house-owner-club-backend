import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { TradeDto } from "./dto/trade.dto";
import { UpdateTradeDto } from "./dto/update-trade.dto";
import { TradeEntity } from "./entities/trade.entity";
import { CreateTradeDto } from "./dto/create-trade.dto";
import { TransactionEntity } from ".././transactions/entities/transaction.entity";
import { TransactionService } from "../transactions/transaction.service";
import { AbstractService } from "../../common/abstract.service";

@Injectable()
export class TradeService extends AbstractService<TradeEntity> {
  constructor(
    @InjectRepository(TradeEntity)
    private tradeEntityRepository: Repository<TradeEntity>,
    @InjectRepository(TransactionEntity)
    private transactionEntityRepository: Repository<TransactionEntity>,
    private transactionService: TransactionService
  ) {
    super(tradeEntityRepository);
  }

  async save(createTradeDto: CreateTradeDto) {
    let transactionData = {
      tokenId: Number(createTradeDto.tokenId),
      projectId: createTradeDto.projectId,
      tag: createTradeDto.tag,
      transactionHash: createTradeDto.transactionHash,
    };

    const tradeData = Object.keys(createTradeDto).reduce((object, key) => {
      if (key !== "transactionHash" && key !== "tag") {
        object[key] = createTradeDto[key];
      }
      return object;
    }, {});

    const tradeEntity = this.tradeEntityRepository.create(tradeData);
    await this.tradeEntityRepository.save(tradeEntity);

    await this.tradeEntityRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        await Promise.all([
          transactionalEntityManager.save(TradeEntity, tradeEntity),
          transactionalEntityManager.save(TransactionEntity, transactionData),
        ]);
      }
    );
    return tradeEntity;
  }

  async findAllPageOptions(
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<TradeDto>> {
    const queryBuilder = this.tradeEntityRepository.createQueryBuilder("trade");
    queryBuilder.leftJoinAndSelect("trade.project", "project");
    queryBuilder.leftJoinAndSelect("trade.type", "type");
    queryBuilder.leftJoinAndSelect("project.category", "category");
    queryBuilder.leftJoinAndSelect("project.currency", "currency");
    queryBuilder.leftJoinAndSelect("trade.agentLand", "agentLand");
    queryBuilder.leftJoinAndSelect("trade.user", "user");

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

  async findAllByUserId(
    userId: string,
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<TradeDto>> {
    const queryBuilder = this.tradeEntityRepository.createQueryBuilder("trade");
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
      queryBuilder.orderBy("trade.createdAt", pageOptionsDto.order);
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
  ): Promise<PageDto<TradeDto>> {
    const queryBuilder = this.tradeEntityRepository.createQueryBuilder("trade");
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
    const queryBuilder = this.tradeEntityRepository
      .createQueryBuilder("trade")
      .leftJoinAndSelect("trade.project", "project")
      .leftJoinAndSelect("trade.type", "type")
      .leftJoinAndSelect("project.category", "category")
      .leftJoinAndSelect("project.currency", "currency")
      .leftJoinAndSelect("trade.agentLand", "agentLand")
      .leftJoinAndSelect("trade.user", "user")
      .where("trade.id = :id", { id })
      .getOne();

    if (!queryBuilder) {
      throw new HttpException("Failed to load data", HttpStatus.NOT_FOUND);
    }

    return queryBuilder;
  }

  async findLandByUser(tokenId: number, nftAddress: string): Promise<any> {
    // Validate input parameters
    if (tokenId === undefined || tokenId === null) {
      throw new HttpException(
        "Property ID (tokenId) is required", 
        HttpStatus.BAD_REQUEST
      );
    }

    if (!nftAddress) {
      throw new HttpException(
        "NFT Address is required", 
        HttpStatus.BAD_REQUEST
      );
    }

    // Query the database
    try {
      const queryBuilder = await this.tradeEntityRepository
        .createQueryBuilder("trade")
        .leftJoinAndSelect("trade.project", "project")
        .leftJoinAndSelect("trade.type", "type")
        .leftJoinAndSelect("project.category", "category")
        .leftJoinAndSelect("project.currency", "currency")
        .leftJoinAndSelect("trade.agentLand", "agentLand")
        .leftJoinAndSelect("trade.user", "user")
        .where("project.nftAddress = :nftAddress", { nftAddress })
        .andWhere("trade.tokenId = :tokenId", { tokenId })
        .getOne();

      if (!queryBuilder) {
        throw new HttpException(
          `No property record found with ID ${tokenId} and NFT address ${nftAddress}`, 
          HttpStatus.NOT_FOUND
        );
      } else {
        // Extract and format user data
        const {
          password,
          referralCode,
          referredBy,
          avatar,
          isKYC,
          isActive,
          id,
          createdAt,
          updatedAt,
          role,
          ...userData
        } = queryBuilder.user;

        // Get transaction history
        let transactionData = [];
        try {
          transactionData = await this.transactionService.getTransactionHash(
            queryBuilder.projectId,
            Number(queryBuilder.agentLand.tokenId)
          );
        } catch (error) {
          // Log transaction error but continue
          console.error("Failed to fetch transaction history:", error.message);
          transactionData = [];
        }

        return { user: userData, transactions: transactionData };
      }
    } catch (error) {
      // Re-throw HttpExceptions as-is
      if (error instanceof HttpException) {
        throw error;
      }
      
      // Log and wrap other errors
      console.error("Error in findLandByUser:", error);
      throw new HttpException(
        "Failed to retrieve property information", 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: string, updateTradeDto: UpdateTradeDto): Promise<any> {
    try {
      const queryBuilder = this.tradeEntityRepository.createQueryBuilder(
        "trade"
      );
      queryBuilder.where("trade.id = :id", { id });
      const data = await queryBuilder.getOne();
      if (!data) {
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
      } else {
        let transactionData = {
          tokenId: Number(data.tokenId),
          projectId: data.projectId,
          tag: updateTradeDto.tag,
          transactionHash: updateTradeDto.transactionHash,
        };

        const tradeData = Object.keys(updateTradeDto).reduce((object, key) => {
          if (key !== "transactionHash" && key !== "tag") {
            object[key] = updateTradeDto[key];
          }
          return object;
        }, {});

        if (updateTradeDto.transactionHash) {
          await this.updateById(id, tradeData);
          const transactionEntity = this.transactionEntityRepository.create(
            transactionData
          );
          await this.transactionEntityRepository.save(transactionEntity);
        } else {
          await this.updateById(id, tradeData);
        }

        return {
          status: HttpStatus.OK,
          statusText: "Record Updated",
        };
      }
    } catch (error) {
      throw new HttpException("Failed", HttpStatus.BAD_GATEWAY);
    }
  }
}
