import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { AbstractEntity } from "../../../common/abstract.entity";
import { UseDto } from "../../../decorators";
import { TradeDto } from "../dto/trade.dto";
import { ProjectEntity } from "../../project/entities/project.entity";
import { TypeEntity } from "../../type/entities/type.entity";
import { AgentLandEntity } from "../../agent-land/entities/agent-land.entity";
import { UserEntity } from "../../user/user.entity";

@Entity({ name: "trade" })
@UseDto(TradeDto)
export class TradeEntity extends AbstractEntity<TradeDto> {
  @Column()
  tokenId: string;

  @Column({ type: "uuid" })
  userId: Uuid;

  @Column({ nullable: true, type: "uuid" })
  buyerId: Uuid;

  @Column({ nullable: true, type: "uuid" })
  buyId: string;

  @Column({ type: "uuid" })
  typeId: Uuid;

  @Column({ nullable: true })
  bidTime: string;

  @Column({ nullable: true })
  price: string;

  @Column({ type: "uuid" })
  agentLandId: Uuid;

  @Column({ type: "uuid" })
  projectId: Uuid;

  @Column({ nullable: true })
  signatureTime: string;

  @Column({ nullable: true })
  signatures: string;

  @Column({ nullable: true })
  highestBidder: string;

  @Column({ default: false, nullable: true })
  isSigned: boolean;

  @Column({ default: false, nullable: true })
  isListed: boolean;

  @Column({ default: false, nullable: true })
  isTradeInitiated: boolean;

  @Column({ default: false, nullable: true })
  isSold: boolean;

  @Column({ default: false, nullable: true })
  isAuction: boolean;

  @Column({ default: false })
  isAllInstallmentPaid: boolean;

  @ManyToOne(() => TypeEntity, (type) => type.trade)
  @JoinColumn({ name: "type_id" })
  type: TypeEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.trade)
  @JoinColumn({ name: "project_id" })
  project: ProjectEntity;

  @ManyToOne(() => UserEntity, (user) => user.trade)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @ManyToOne(() => AgentLandEntity, (agentLand) => agentLand.trade)
  @JoinColumn({ name: "agent_land_id" })
  agentLand: AgentLandEntity;
}
