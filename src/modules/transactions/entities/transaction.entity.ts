import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { AbstractEntity } from "../../../common/abstract.entity";
import { UseDto } from "../../../decorators";
import { TransactionDto } from "../dto/transaction.dto";
import { ProjectEntity } from "../../project/entities/project.entity";

@Entity({ name: "transactions" })
@UseDto(TransactionDto)
export class TransactionEntity extends AbstractEntity<TransactionDto> {
  @Column({ type: "uuid" })
  projectId: Uuid;

  @Column()
  tokenId: number;

  @Column({nullable: true})
  tag: string;

  @Column()
  transactionHash: string;

  @ManyToOne(() => ProjectEntity, (project) => project.transaction)
  @JoinColumn({ name: "project_id" })
  project: ProjectEntity;
}
