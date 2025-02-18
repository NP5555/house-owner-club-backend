import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "../../../common/abstract.entity";
import { UseDto } from "../../../decorators";
import { DocumentCatalogueDto } from "../dto/documentCatalogue.dto";
import { UserEntity } from "../../user/user.entity";

@Entity({ name: "documentCatalogue" })
@UseDto(DocumentCatalogueDto)
export class DocumentCatalogueEntity extends AbstractEntity<DocumentCatalogueDto> {
  @Column()
  document: string;

  @Column()
  name: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ type: "uuid" })
  userId: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.documentCatalogue, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: UserEntity;
}
