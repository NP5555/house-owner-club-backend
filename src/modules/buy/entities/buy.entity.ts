import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { AbstractEntity } from "../../../common/abstract.entity";
import { UseDto } from "../../../decorators";
import { BuyDto } from "../dto/buy.dto";
import { ProjectEntity } from "../../project/entities/project.entity";
import { TypeEntity } from "../../type/entities/type.entity";
import { AgentLandEntity } from "../../agent-land/entities/agent-land.entity";
import { UserEntity } from "../../user/user.entity";

@Entity({ name: "buys" })
@UseDto(BuyDto)
export class BuyEntity extends AbstractEntity<BuyDto> {
  @Column()
  wallet: string;

  @Column()
  tokenId: string;

  @Column({ type: "uuid" })
  typeId: Uuid;

  @Column({ type: "uuid" })
  userId: Uuid;

  @Column({ nullable: true, type: "uuid" })
  buyerId: Uuid;

  @Column()
  agentWallet: string;

  @Column({ type: "uuid" })
  agentLandId: Uuid;

  @Column({ type: "uuid" })
  projectId: Uuid;

  @Column({ nullable: true })
  signatureTime: string;

  @Column({ nullable: true })
  signatures: string;

  @Column({ default: false, nullable: true })
  isSigned: boolean;

  @Column({ default: false })
  updateInstallment: boolean;

  @Column({ default: false, nullable: true })
  isSold: boolean;


  @ManyToOne(() => ProjectEntity, (project) => project.buys)
  @JoinColumn({ name: "project_id" })
  project: ProjectEntity;

  @ManyToOne(() => TypeEntity, (type) => type.buys)
  @JoinColumn({ name: "type_id" })
  type: TypeEntity;

  @ManyToOne(() => UserEntity, (user) => user.buys)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @ManyToOne(() => AgentLandEntity, (agentLand) => agentLand.buys)
  @JoinColumn({ name: "agent_land_id" })
  agentLand: AgentLandEntity;
}
