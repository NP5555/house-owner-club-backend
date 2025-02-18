import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { AbstractEntity } from "../../../common/abstract.entity";
import { UseDto } from "../../../decorators";
import { RentDto } from "../dto/rent.dto";
import { ProjectEntity } from "../../project/entities/project.entity";
import { AgentLandEntity } from "../../agent-land/entities/agent-land.entity";
import { UserEntity } from "../../user/user.entity";
import { CurrencyEntity } from "../../currency/entities/currency.entity";

@Entity({ name: "rent" })
@UseDto(RentDto)
export class RentEntity extends AbstractEntity<RentDto> {
  @Column()
  tokenId: string;

  @Column()
  rentAmount: string;

  @Column()
  securityAmount: string;

  @Column({ default: false })
  isAcceptByTenant: boolean;

  @Column({ default: false })
  requestForBack: boolean;

  @Column({ default: false })
  isOnchain: boolean;

  @Column()
  lastPaymentTime: string;

  @Column({ nullable: true})
  currentPaymentTime: string;

  @Column({nullable: true})
  acceptRentTime: string;

  @Column()
  duration: string;

  @Column({default: false})
  isVacationRent: boolean;

  @Column({ type: "uuid" })
  currencyId: Uuid;

  @Column({ nullable: true, type: "uuid" })
  tenantId: Uuid;

  @Column({ type: "uuid" })
  ownerId: Uuid;

  @Column({ type: "uuid" })
  projectId: Uuid;

  @Column({ type: "uuid" })
  agentLandId: Uuid;

  @ManyToOne(() => UserEntity, (tenant) => tenant.rent)
  @JoinColumn({ name: "tenant_id" })
  tenant: UserEntity;

  @ManyToOne(() => UserEntity, (owner) => owner.rent)
  @JoinColumn({ name: "owner_id" })
  owner: UserEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.trade)
  @JoinColumn({ name: "project_id" })
  project: ProjectEntity;

  @ManyToOne(() => AgentLandEntity, (agentLand) => agentLand.trade)
  @JoinColumn({ name: "agent_land_id" })
  agentLand: AgentLandEntity;

  @ManyToOne(() => CurrencyEntity, (currency) => currency.rent)
  @JoinColumn({ name: "currency_id" })
  currency: CurrencyEntity;
}
