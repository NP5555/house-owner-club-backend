import { StringField } from "../../../decorators";

export class SendNewsDto {
    @StringField()
    news: string;
}
