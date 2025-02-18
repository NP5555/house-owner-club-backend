import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { NewsletterDto } from "./dto/newsletter.dto";
import { NewsletterEtity } from "./entities/newsletter.entity";
import { AbstractService } from "../../common/abstract.service";
import { CreateNewsletterDto } from "./dto/create-newsletter.dto";
import { SendNewsDto } from "./dto/sendNews.dto";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class NewsletterService extends AbstractService<NewsletterEtity> {
  constructor(
    @InjectRepository(NewsletterEtity)
    private newsletterEntityRepository: Repository<NewsletterEtity>,
    private mailerService: MailerService
  ) {
    super(newsletterEntityRepository);
  }

  async subscribeNewsletter(
    createNewsletterDto: CreateNewsletterDto
  ): Promise<CreateNewsletterDto | any> {
    const queryBuilder = this.newsletterEntityRepository.createQueryBuilder(
      "newsletter"
    );

    queryBuilder.orWhere("newsletter.email = :email", {
      email: createNewsletterDto.email,
    });

    const subscriber: any = await queryBuilder.getOne();
    if (subscriber) {
      throw new HttpException("Already Subscribed", HttpStatus.CONFLICT);
    }
    const subscribe = this.newsletterEntityRepository.create(
      createNewsletterDto
    );
    await this.newsletterEntityRepository.save(subscribe);
  }

  async sendNews(sendNews: SendNewsDto): Promise<SendNewsDto | any> {
    console.log(
      "🚀 ~ file: newsletter.service.ts:43 ~ NewsletterService ~ sendNews ~ sendNews:",
      sendNews
    );
    const queryBuilder = this.newsletterEntityRepository.createQueryBuilder(
      "newsletter"
    );
    const subscribers = await queryBuilder.getMany();
    const emails = subscribers.map((sub) => sub.email);

    await this.mailerService.sendMail({
      to: emails,
      from: '"noreply" <hello@hoc.com>',
      subject: "Home Owners club - Newsletter",
      template: "../../../templates/transactional.hbs",
      context: {
        sendNews: sendNews.news,
      },
    });
    return emails;
  }

  async getAllEmails(
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<NewsletterDto>> {
    const queryBuilder = this.newsletterEntityRepository.createQueryBuilder(
      "newsletter"
    );

    if (!!pageOptionsDto.order) {
      queryBuilder.orderBy("newsletter.createdAt", pageOptionsDto.order);
    }
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
    if (items.length > 0) {
      return items.toPageDto(pageMetaDto);
    } else {
      throw new HttpException("Record not found", HttpStatus.NOT_FOUND);
    }
  }

  async deleteByEmail(email: string): Promise<NewsletterEtity | any> {
    const queryBuilder = this.newsletterEntityRepository.createQueryBuilder(
      "newsletter"
    );

    queryBuilder.orWhere("newsletter.email = :email", {
      email: email,
    });

    const subscriber: any = await queryBuilder.getOne();
    if (subscriber) {
      await this.newsletterEntityRepository.delete(subscriber.id);
      return true;
    } else {
      throw new HttpException("Record not found", HttpStatus.NOT_FOUND);
    }
  }
}
