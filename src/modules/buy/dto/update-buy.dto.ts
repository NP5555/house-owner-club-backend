import { BooleanFieldOptional, StringFieldOptional } from "../../../decorators";

export class UpdateBuyDto {
  @StringFieldOptional()
  signatures: string;

  @StringFieldOptional()
  signatureTime: string;

  @StringFieldOptional()
  userId: string;

  @BooleanFieldOptional()
  isSigned: boolean;

  @BooleanFieldOptional()
  isSold: boolean;

  @BooleanFieldOptional()
  updateInstallment: boolean;
}
