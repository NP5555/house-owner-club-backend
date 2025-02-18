import { BooleanFieldOptional, StringFieldOptional } from "../../../decorators";

export class UpdateCurrencyDto {
  @StringFieldOptional()
  name: string;

  @BooleanFieldOptional()
  isNative: boolean;

  @StringFieldOptional()
  tokenAddress: string;
}
