import { AbstractDto } from "../../../common/dto/abstract.dto";
import { ApiProperty } from "@nestjs/swagger";
import { TradeEntity } from "../entities/trade.entity";
import { ProjectEntity } from "../../project/entities/project.entity";
import { TypeEntity } from "../../type/entities/type.entity";
import { AgentLandEntity } from "../../agent-land/entities/agent-land.entity";
import { UserEntity } from "../../user/user.entity";

export class TradeDto extends AbstractDto {
  @ApiProperty()
  tokenId: string;

  @ApiProperty()
  userid: string;

  @ApiProperty()
  typeId: string;

  @ApiProperty()
  buyerId: string;

  @ApiProperty()
  buyId: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  agentLandId: string;

  @ApiProperty()
  signatureTime: string;

  @ApiProperty()
  signatures: string;

  @ApiProperty()
  bidTime: string;

  @ApiProperty()
  highestBidder: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  isSigned: boolean;

  @ApiProperty()
  isListed: boolean;

  @ApiProperty()
  isTradeInitiated: boolean;

  @ApiProperty()
  isSold: boolean;

  @ApiProperty()
  isAuction: boolean;

  @ApiProperty()
  isAllInstallmentPaid: boolean;

  @ApiProperty({ type: () => ProjectEntity })
  project: ProjectEntity;

  @ApiProperty({ type: () => AgentLandEntity })
  agentLand: AgentLandEntity;

  @ApiProperty({ type: () => UserEntity })
  user: UserEntity;

  @ApiProperty({ type: () => TypeEntity })
  type: TypeEntity;

  constructor(entity: TradeEntity) {
    super(entity);
    this.signatureTime = entity.signatureTime;
    this.signatures = entity.signatures;
    this.bidTime = entity.bidTime;
    this.price = entity.price;
    this.isSigned = entity.isSigned;
    this.isListed = entity.isListed;
    this.isSold = entity.isSold;
    this.isAuction = entity.isAuction;
    this.isAllInstallmentPaid = entity.isAllInstallmentPaid;
    this.isTradeInitiated = entity.isTradeInitiated;
    this.tokenId = entity.tokenId;
    this.buyerId = entity.buyerId;
    this.buyId = entity.buyId;
    this.agentLandId = entity.agentLandId;
    this.agentLand = entity.agentLand;
    this.userid = entity.userId;
    this.user = entity.user;
    this.typeId = entity.typeId;
    this.type = entity.type;
    this.projectId = entity.projectId;
    this.project = entity.project;
  }
}
