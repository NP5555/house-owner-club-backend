import { StringField, NumberField } from "../../../decorators";

export class CreateProjectDto {
  @StringField()
  name: string;

  @NumberField()
  price: number;

  @StringField()
  description: string;

  @StringField()
  nftAddress: string;

  @StringField()
  saleAddress: string;

  @StringField()
  categoryId: Uuid;

  @StringField()
  currencyId: Uuid;

  @StringField()
  developerId: Uuid;
}
