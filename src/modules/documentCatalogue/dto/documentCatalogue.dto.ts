import { AbstractDto } from "../../../common/dto/abstract.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { DocumentCatalogueEntity } from "../entities/documentCatalogue.entity";
import { UserEntity } from "../../user/user.entity";

export class DocumentCatalogueDto extends AbstractDto {
  @ApiProperty()
  document: string;

  @ApiPropertyOptional()
  name: string;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  userId: string;

  @ApiProperty({ type: () => UserEntity })
  user: UserEntity;

  constructor(entity: DocumentCatalogueEntity) {
    super(entity);
    this.document = entity.document;
    this.name = entity.name;
    this.isAdmin = entity.isAdmin;
    this.userId = entity.userId;
    this.user = entity.user;
  }
}
