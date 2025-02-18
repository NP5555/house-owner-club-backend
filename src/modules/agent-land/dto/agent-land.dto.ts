import { AbstractDto } from "../../../common/dto/abstract.dto";
import { ApiProperty } from "@nestjs/swagger";
import { AgentLandEntity } from "../entities/agent-land.entity";
import { LandStatus } from "../../../constants/land-status";
import { UserEntity } from "../../user/user.entity";
import { ProjectEntity } from "../../project/entities/project.entity";
import { TypeEntity } from "../../type/entities/type.entity";
import { CurrencyEntity } from "../../currency/entities/currency.entity";
import { CategoryEntity } from "../../category/entities/category.entity";

export class AgentLandDto extends AbstractDto {
  @ApiProperty()
  tokenId: string;

  @ApiProperty()
  typeId: string;

  @ApiProperty()
  agentId: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  developerId: string;

  @ApiProperty({ type: [String] })
  youtubeLinks: string[];

  @ApiProperty({ type: [String] })
  landImage: string[];

  @ApiProperty({ enum: LandStatus })
  status: LandStatus;

  @ApiProperty({ type: () => UserEntity })
  user: UserEntity;

  @ApiProperty({ type: () => ProjectEntity })
  project: ProjectEntity;

  @ApiProperty({ type: () => TypeEntity })
  type: TypeEntity;

  @ApiProperty({ type: () => CurrencyEntity })
  currency: CurrencyEntity;

  @ApiProperty({ type: () => CategoryEntity })
  category: CategoryEntity;

  constructor(entity: AgentLandEntity) {
    super(entity);
    this.tokenId = entity.tokenId;
    this.typeId = entity.typeId;
    this.agentId = entity.agentId;
    this.projectId = entity.projectId;
    this.developerId = entity.developerId;
    this.status = entity.status;
    this.user = entity.user;
    this.project = entity.project;
    this.type = entity.type;
    this.landImage = entity.landImage;
    this.youtubeLinks = entity.youtubeLinks;
    this.currency = entity.project.currency;
    this.category = entity.project.category;
  }
}
