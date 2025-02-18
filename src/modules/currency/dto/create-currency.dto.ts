import { BooleanField, StringField, StringFieldOptional } from "../../../decorators";

export class CreateCurrencyDto {
    @StringField()
    name: string;

    @BooleanField()
    isNative: boolean;

    @StringFieldOptional()
    tokenAddress: string;
}
