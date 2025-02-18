import { AbstractDto } from "../../../common/dto/abstract.dto";
import { ApiProperty } from "@nestjs/swagger";
import { TransactionEntity } from "../entities/transaction.entity";

export class TransactionDto extends AbstractDto {
  @ApiProperty()
  projectId: string;

  @ApiProperty()
  tokenId: number;

  @ApiProperty()
  tag: string;

  @ApiProperty()
  transactionHash: string;

  constructor(entity: TransactionEntity) {
    super(entity);
    this.projectId = entity.projectId;
    this.tokenId = entity.tokenId;
    this.tag = entity.tag;
    this.transactionHash = entity.transactionHash;
  }
}
