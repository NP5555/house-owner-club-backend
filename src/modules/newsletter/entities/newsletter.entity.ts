import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { AbstractEntity } from "../../../common/abstract.entity";
import { UseDto } from "../../../decorators";
import { NewsletterDto } from "../dto/newsletter.dto";

@Entity({ name: "newsletter" })
@UseDto(NewsletterDto)
export class NewsletterEtity extends AbstractEntity<NewsletterDto> {
  @Column()
  email: Uuid;
}
