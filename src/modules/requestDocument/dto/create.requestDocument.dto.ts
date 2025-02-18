import { StringField } from "../../../decorators";

export class CreateRequestDocumentDto {
  @StringField()
  message: string;

  @StringField()
  userId: string;
}
