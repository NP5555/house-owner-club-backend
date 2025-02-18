import { StringFieldOptional, NumberFieldOptional } from "../../../decorators";
import { ProjectStatus } from "../../../constants/project-status";

export class UpdateProjectDto {
  @StringFieldOptional()
  name: string;

  @NumberFieldOptional()
  price: number;

  @StringFieldOptional()
  description: string;

  @StringFieldOptional()
  status: ProjectStatus;

  @StringFieldOptional()
  categoryId: Uuid;

  @StringFieldOptional()
  currencyId: Uuid;

  @StringFieldOptional()
  developerId: Uuid;

  @StringFieldOptional()
  saleAddress: string;

  @StringFieldOptional()
  nftAddress: string;
}
