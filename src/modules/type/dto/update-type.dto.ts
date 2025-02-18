import { StringFieldOptional, NumberFieldOptional } from "../../../decorators";

export class UpdateTypeDto {
    @StringFieldOptional()
    name: string;

    @NumberFieldOptional()
    blockchainId: number;

    @StringFieldOptional()
    description: string;

}
