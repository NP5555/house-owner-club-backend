import { AbstractDto } from "../../../common/dto/abstract.dto";
import { ProjectStatus } from "../../../constants/project-status";
// import { RateUnit } from "../../../constants/rate-unit";
import { ApiProperty } from "@nestjs/swagger";
import { ProjectEntity } from "../entities/project.entity";
import { CurrencyEntity } from "../../currency/entities/currency.entity";
import { CategoryEntity } from "../../category/entities/category.entity";
import { UserEntity } from "../../user/user.entity";
export class ProjectDto extends AbstractDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  saleAddress: string;

  @ApiProperty()
  nftAddress: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: ProjectStatus })
  status: ProjectStatus;

  @ApiProperty({ required: false })
  categoryId?: Uuid;

  @ApiProperty()
  currencyId: Uuid;

  @ApiProperty()
  developerId: Uuid;

  @ApiProperty({ type: CurrencyEntity })
  currency: CurrencyEntity;

  @ApiProperty({ type: CategoryEntity })
  category: CategoryEntity;

  @ApiProperty({ type: UserEntity })
  developer: UserEntity;

  constructor(entity: ProjectEntity) {
    super(entity);
    this.name = entity.name;
    this.price = entity.price;
    this.description = entity.description;
    this.status = entity.status;
    this.nftAddress = entity.nftAddress;
    this.saleAddress = entity.saleAddress;
    this.categoryId = entity.categoryId;
    this.currencyId = entity.currencyId;
    this.developerId = entity.developerId;
    this.developer = entity.developer;
    this.currency = entity.currency;
    this.category = entity.category;
  }
}
