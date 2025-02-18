import { StringFieldOptional } from "../../../decorators";

export class UpdateRequestDocumentDto {
  @StringFieldOptional()
  message: string;
}
