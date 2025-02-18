import { BooleanFieldOptional, StringField } from "../../../decorators";

export class CreateBuyDto {
  @StringField()
  wallet: string;

  @StringField()
  tokenId: string;

  @StringField()
  typeId: string;

  @StringField()
  userId: string;

  @StringField()
  agentLandId: string;

  @StringField()
  agentWallet: string;

  @StringField()
  projectId: string;

  @BooleanFieldOptional()
  updateInstallment: boolean;
}
