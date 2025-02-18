import { StringField, BooleanField, StringFieldOptional } from "../../../decorators";

export class CreateTradeDto {
  @StringField()
  tokenId: string;

  @StringField()
  userId: string;

  @StringField()
  typeId: string;

  @StringField()
  agentLandId: string;

  @StringField()
  projectId: string;

  @StringFieldOptional()
  transactionHash: string;

  @StringFieldOptional()
  tag: string;

  @BooleanField()
  isAllInstallmentPaid: boolean;
}
