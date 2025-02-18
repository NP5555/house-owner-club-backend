import { StringField } from "../../../decorators";

export class CreateTypeDto {
    @StringField()
    name: string;

    @StringField()
    projectId: Uuid;

    @StringField()
    description: string;
}
