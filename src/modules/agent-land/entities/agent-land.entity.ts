import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { AbstractEntity } from "../../../common/abstract.entity";
import { UseDto } from "../../../decorators";
import { AgentLandDto } from "../dto/agent-land.dto";
import { ProjectEntity } from "../../project/entities/project.entity";
import { TypeEntity } from "../../type/entities/type.entity";
import { LandStatus } from "../../../constants/land-status";
import { UserEntity } from "../../user/user.entity";
import { BuyEntity } from "../../buy/entities/buy.entity";
import { TradeEntity } from "../../trade/entities/trade.entity";

@Entity({ name: "agent_land" })
@UseDto(AgentLandDto)
export class AgentLandEntity extends AbstractEntity<AgentLandDto> {
  @Column()
  tokenId: string;

  @Column({ type: "uuid" })
  typeId: Uuid;

  @Column({ type: "uuid" })
  developerId: Uuid;

  @Column({ type: "uuid" })
  agentId: Uuid;

  @Column({ type: "uuid" })
  projectId: Uuid;

  @Column({ type: "simple-array", nullable: true })
  youtubeLinks: string[];

  @Column({ type: "simple-array", nullable: true })
  landImage: string[];

  @Column({ type: "enum", enum: LandStatus, default: LandStatus.UNSOLD })
  status: LandStatus;

  @ManyToOne(() => ProjectEntity, (project) => project.agentLands)
  @JoinColumn({ name: "project_id" })
  project: ProjectEntity;

  @ManyToOne(() => TypeEntity, (t) => t.agentLands)
  @JoinColumn({ name: "type_id" })
  type: TypeEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.agentLands, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "agent_id" })
  user: UserEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.agentLands, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "developer_id" })
  developer: UserEntity;

  @OneToMany(() => BuyEntity, (buyEn) => buyEn.agentLand)
  buys: BuyEntity[];

  @OneToMany(() => TradeEntity, (buyEn) => buyEn.agentLand)
  trade: TradeEntity[];
}
