import { AbstractDto } from "../../../common/dto/abstract.dto";
import { ApiProperty } from "@nestjs/swagger";
import { RequestDocumentEntity } from "../entities/requestDocument.entity";
import { UserEntity } from "../../user/user.entity";

export class RequestDocumentDto extends AbstractDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ type: () => UserEntity })
  user: UserEntity;

  constructor(entity: RequestDocumentEntity) {
    super(entity);
    this.message = entity.message;
    this.userId = entity.userId;
    this.user = entity.user;
  }
}
