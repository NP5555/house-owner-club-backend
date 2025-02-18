import { AbstractDto } from "../../../common/dto/abstract.dto";
import { ApiProperty } from "@nestjs/swagger";
import { BuyEntity } from "../entities/buy.entity";
import { ProjectEntity } from "../../project/entities/project.entity";
import { TypeEntity } from "../../type/entities/type.entity";
import { AgentLandEntity } from "../../agent-land/entities/agent-land.entity";
import { UserEntity } from "../../user/user.entity";

export class BuyDto extends AbstractDto {
  @ApiProperty()
  wallet: string;

  @ApiProperty()
  tokenId: string;

  @ApiProperty()
  typeId: string;

  @ApiProperty()
  userid: string;

  @ApiProperty()
  buyerId: string;

  @ApiProperty()
  agentWallet: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  agentLandId: string;

  @ApiProperty()
  signatureTime: string;

  @ApiProperty()
  signatures: string;

  @ApiProperty()
  isSigned: boolean;

  @ApiProperty()
  updateInstallment: boolean;

  @ApiProperty()
  isSold: boolean;

  @ApiProperty({ type: () => ProjectEntity })
  project: ProjectEntity;

  @ApiProperty({ type: () => TypeEntity })
  type: TypeEntity;

  @ApiProperty({ type: () => AgentLandEntity })
  agentLand: AgentLandEntity;

  @ApiProperty({ type: () => UserEntity })
  user: UserEntity;

  constructor(entity: BuyEntity) {
    super(entity);
    this.wallet = entity.wallet;
    this.tokenId = entity.tokenId;
    this.agentWallet = entity.agentWallet;
    this.agentLandId = entity.agentLandId;
    this.agentLand = entity.agentLand;
    this.typeId = entity.typeId;
    this.userid = entity.userId;
    this.type = entity.type;
    this.projectId = entity.projectId;
    this.signatureTime = entity.signatureTime;
    this.signatures = entity.signatures;
    this.isSigned = entity.isSigned;
    this.isSold = entity.isSold;
    this.updateInstallment = entity.updateInstallment;
    this.project = entity.project;
    this.user = entity.user;
  }
}
