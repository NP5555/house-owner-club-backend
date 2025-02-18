import { ApiProperty } from "@nestjs/swagger";

export class CreateDocumentCatalogueDto {
  @ApiProperty()
  document: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  isAdmin: boolean;
}
