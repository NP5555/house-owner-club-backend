import { AbstractDto } from "../../../common/dto/abstract.dto";
import { ApiProperty } from "@nestjs/swagger";
import { RentEntity } from "../entities/rent.entity";
import { ProjectEntity } from "../../project/entities/project.entity";
import { TypeEntity } from "../../type/entities/type.entity";
import { AgentLandEntity } from "../../agent-land/entities/agent-land.entity";
import { UserEntity } from "../../user/user.entity";
import { CurrencyEntity } from "../../currency/entities/currency.entity";

export class RentDto extends AbstractDto {
  @ApiProperty()
  tokenId: string;

  @ApiProperty()
  rentAmount: string;

  @ApiProperty()
  securityAmount: string;

  @ApiProperty()
  isAcceptByTenant: boolean;

  @ApiProperty()
  requestForBack: boolean;

  @ApiProperty()
  lastPaymentTime: string;

  @ApiProperty()
  currentPaymentTime: string;

  @ApiProperty()
  acceptRentTime: string;

  @ApiProperty()
  isOnchain: boolean;

  @ApiProperty()
  isVacationRent: boolean;

  @ApiProperty({nullable: true})
  tenantId: Uuid;

  @ApiProperty()
  ownerId: Uuid;

  @ApiProperty()
  projectId: Uuid;

  @ApiProperty()
  agentLandId: Uuid;

  @ApiProperty()
  currencyId: Uuid;

  @ApiProperty()
  duration: string;

  @ApiProperty({ type: () => ProjectEntity })
  project: ProjectEntity;

  @ApiProperty({ type: () => AgentLandEntity })
  agentLand: AgentLandEntity;

  @ApiProperty({ type: () => UserEntity })
  tenant: UserEntity;

  @ApiProperty({ type: () => UserEntity })
  owner: UserEntity;

  @ApiProperty({ type: () => TypeEntity })
  type: TypeEntity;

  @ApiProperty({ type: () => CurrencyEntity })
  currency: CurrencyEntity;

  constructor(entity: RentEntity) {
    super(entity);
    this.tokenId = entity.tokenId;
    this.rentAmount = entity.rentAmount;
    this.securityAmount = entity.securityAmount;
    this.isAcceptByTenant = entity.isAcceptByTenant;
    this.requestForBack = entity.requestForBack;
    this.lastPaymentTime = entity.lastPaymentTime;
    this.currentPaymentTime = entity.currentPaymentTime;
    this.acceptRentTime = entity.acceptRentTime;
    this.duration = entity.duration;
    this.isOnchain = entity.isOnchain;
    this.currencyId = entity.currencyId;
    this.currency = entity.currency;
    this.tenantId = entity.tenantId;
    this.tenant = entity.tenant;
    this.ownerId = entity.ownerId;
    this.owner = entity.owner;
    this.projectId = entity.projectId;
    this.project = entity.project;
    this.agentLandId = entity.agentLandId;
    this.agentLand = entity.agentLand;
  }
}
