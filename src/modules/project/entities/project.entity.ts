import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "../../../common/abstract.entity";
import { UseDto } from "../../../decorators";
import { ProjectDto } from "../dto/project.dto";
import { ProjectStatus } from "../../../constants/project-status";
import { CategoryEntity } from "../../category/entities/category.entity";
import { CurrencyEntity } from "../../currency/entities/currency.entity";
import { AgentLandEntity } from "../../agent-land/entities/agent-land.entity";
import { TypeEntity } from "../../type/entities/type.entity";
import { BuyEntity } from "../../buy/entities/buy.entity";
import { TradeEntity } from "../../trade/entities/trade.entity";
import { TransactionEntity } from "../../transactions/entities/transaction.entity";
import { UserEntity } from "../../user/user.entity";

@Entity({ name: "projects" })
@UseDto(ProjectDto)
export class ProjectEntity extends AbstractEntity<ProjectDto> {
  @Column()
  name: string;

  @Column({
    type: "float",
    default: 0,
  })
  price: number;

  @Column()
  description: string;

  @Column({ type: "enum", enum: ProjectStatus, default: ProjectStatus.OPEN })
  status: ProjectStatus;

  @Column()
  nftAddress: string;

  @Column()
  saleAddress: string;

  @Column({ type: "uuid" })
  categoryId: Uuid;

  @Column({ type: "uuid" })
  currencyId: Uuid;

  @Column({ type: "uuid" })
  developerId: Uuid;

  @ManyToOne(() => CategoryEntity, (category) => category.projects)
  @JoinColumn({ name: "category_id" })
  category: CategoryEntity;

  @ManyToOne(() => CurrencyEntity, (currency) => currency.projects)
  @JoinColumn({ name: "currency_id" })
  currency: CurrencyEntity;

  @OneToMany(() => TypeEntity, (typeEn) => typeEn.project)
  types: TypeEntity[];

  @OneToMany(() => BuyEntity, (buyEn) => buyEn.project)
  buys: BuyEntity[];

  @OneToMany(() => TradeEntity, (buyEn) => buyEn.project)
  trade: TradeEntity[];

  @OneToMany(() => AgentLandEntity, (typeEn) => typeEn.project)
  agentLands: AgentLandEntity[];

  @OneToMany(() => TransactionEntity, (transactionEn) => transactionEn.project)
  transaction: TransactionEntity[];

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.project, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "developer_id" })
  developer: UserEntity;
}
