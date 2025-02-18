import { StringFieldOptional } from "../../../decorators";

export class UpdateDocumentDto {
  @StringFieldOptional()
  name: string;

  @StringFieldOptional()
  description: string;

  @StringFieldOptional()
  url: string;
}
