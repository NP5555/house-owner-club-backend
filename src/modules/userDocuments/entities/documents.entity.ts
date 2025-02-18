import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "../../../common/abstract.entity";
import { UseDto } from "../../../decorators";
import { DocumentDto } from "../dto/documents.dto";
import { UserEntity } from "../../user/user.entity";

@Entity({ name: "documents" })
@UseDto(DocumentDto)
export class DocumentEntity extends AbstractEntity<DocumentDto> {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column({ type: "uuid" })
  userId: string;
  
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.agentLands, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  // @OneToMany(() => ProjectEntity, (projectEn) => projectEn.area)
  // projects: ProjectEntity[];
}
