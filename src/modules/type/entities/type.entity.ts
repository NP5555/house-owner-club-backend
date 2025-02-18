import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { AbstractEntity } from "../../../common/abstract.entity";
import { UseDto } from "../../../decorators";
import { TypeDto } from "../dto/type.dto";
import { ProjectEntity } from "../../project/entities/project.entity";
import { AgentLandEntity } from "../../agent-land/entities/agent-land.entity";
import { BuyEntity } from "../../buy/entities/buy.entity";
import { TradeEntity } from "../../trade/entities/trade.entity";

@Entity({ name: "types" })
@UseDto(TypeDto)
export class TypeEntity extends AbstractEntity<TypeDto> {
  @Column()
  name: string;

  @Column({ nullable: true })
  blockchainId: number;

  @Column()
  description: string;

  @Column({ type: "uuid" })
  projectId: Uuid;

  @ManyToOne(() => ProjectEntity, (project) => project.types)
  @JoinColumn({ name: "project_id" })
  project: ProjectEntity;

  @OneToMany(() => AgentLandEntity, (typeEn) => typeEn.type)
  agentLands: AgentLandEntity[];

  @OneToMany(() => BuyEntity, (buyEn) => buyEn.type)
  buys: BuyEntity[];

  @OneToMany(() => TradeEntity, (buyEn) => buyEn.type)
  trade: TradeEntity[];
}
