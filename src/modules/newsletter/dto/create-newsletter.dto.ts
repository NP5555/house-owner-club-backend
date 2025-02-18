import { StringField } from "../../../decorators";

export class CreateNewsletterDto {
    @StringField()
    email: Uuid;
}
