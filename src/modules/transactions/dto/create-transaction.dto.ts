import { StringField, NumberField } from "../../../decorators";

export class CreateTransactionDto {
    @StringField()
    projectId: Uuid;

    @NumberField()
    tokenId: number;

    @StringField()
    transactionHash: string;
}
