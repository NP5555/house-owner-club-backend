import { StringField } from "../../../decorators";

export class CreateCategoryDto {
    @StringField()
    name: string;

    @StringField()
    description: string;
}
