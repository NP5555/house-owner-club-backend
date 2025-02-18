import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "../../../common/abstract.entity";
import { UseDto } from "../../../decorators";
import { RequestDocumentDto } from "../dto/requestDocument.dto";
import { UserEntity } from "../../user/user.entity";

@Entity({ name: "requestDocuments" })
@UseDto(RequestDocumentDto)
export class RequestDocumentEntity extends AbstractEntity<RequestDocumentDto> {
  @Column()
  message: string;
  @Column({ type: "uuid" })
  userId: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.agentLands, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}
