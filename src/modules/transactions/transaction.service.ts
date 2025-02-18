import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { TransactionDto } from "./dto/transaction.dto";
import { TransactionEntity } from "./entities/transaction.entity";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { AbstractService } from "../../common/abstract.service";

@Injectable()
export class TransactionService extends AbstractService<TransactionEntity> {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionEntityRepository: Repository<TransactionEntity>
  ) {
    super(transactionEntityRepository);
  }

  async save(createTransactionDto: CreateTransactionDto) {
    const typeEntity = this.transactionEntityRepository.create(createTransactionDto);
    await this.transactionEntityRepository.save(typeEntity);
    return typeEntity;
  }

  async getTransactionHash(
    projectId: Uuid,
    tokenId: number
  ): Promise<any> {
    const transactionData = await this.transactionEntityRepository
    .createQueryBuilder("transaction")
    .where("transaction.projectId = :projectId", { projectId })
    .andWhere("transaction.tokenId = :tokenId", { tokenId })
    .orderBy("transaction.createdAt", "DESC")
    .getMany();

    return transactionData

  }

  async getAllTransactions(
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<TransactionDto>> {
    const queryBuilder = this.transactionEntityRepository.createQueryBuilder("transaction");
    queryBuilder.leftJoinAndSelect("transaction.project", "project");

    if (!!pageOptionsDto.q) {
      queryBuilder.where("transaction.name like :search", {
        search: `%${pageOptionsDto.q}%`,
      });
    }
    if (!!pageOptionsDto.order) {
      queryBuilder.orderBy("transaction.createdAt", pageOptionsDto.order);
    }
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
    if (items.length > 0) {
      return items.toPageDto(pageMetaDto);
    } else {
      throw new HttpException("Record Not Found", HttpStatus.NOT_FOUND);
    }
  }
}
