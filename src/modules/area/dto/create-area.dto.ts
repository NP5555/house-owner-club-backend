import { StringField } from "../../../decorators";

export class CreateAreaDto {
    @StringField()
    name: string;

    @StringField()
    description: string;
}
