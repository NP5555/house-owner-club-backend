import { AbstractDto } from "../../../common/dto/abstract.dto";
import { ApiProperty } from "@nestjs/swagger";
import { NewsletterEtity } from "../entities/newsletter.entity";

export class NewsletterDto extends AbstractDto {
  @ApiProperty()
  email: Uuid;

  constructor(entity: NewsletterEtity) {
    super(entity);
    this.email = entity.email;
  }
}
