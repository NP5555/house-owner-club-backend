import { StringField } from "../../../decorators";

export class CreateDocumentDto {
  @StringField()
  name: string;

  @StringField()
  description: string;

  @StringField()
  url: string;

  @StringField()
  userId: string;
}
