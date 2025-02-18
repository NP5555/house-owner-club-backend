import { AbstractDto } from "../../../common/dto/abstract.dto";
import { ApiProperty } from "@nestjs/swagger";
import { DocumentEntity } from "../entities/documents.entity";
import { UserEntity } from "../../user/user.entity";

export class DocumentDto extends AbstractDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ type: () => UserEntity })
  user: UserEntity;

  constructor(entity: DocumentEntity) {
    super(entity);
    this.name = entity.name;
    this.description = entity.description;
    this.url = entity.url;
    this.userId = entity.userId;
    this.user = entity.user;
  }
}
