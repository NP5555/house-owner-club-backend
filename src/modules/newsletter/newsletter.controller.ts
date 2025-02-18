import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  ValidationPipe,
} from "@nestjs/common";
import { NewsletterService } from "./newsletter.service";
import { Auth } from "../../decorators";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { NewsletterDto } from "./dto/newsletter.dto";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { RoleType } from "../../constants";
import { CreateNewsletterDto } from "./dto/create-newsletter.dto";
import { SendNewsDto } from "./dto/sendNews.dto";

@Controller("newsletter")
@ApiTags("newsletter")
export class NewsletterController {
  constructor(readonly service: NewsletterService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Subscribe to the newsletter",
    type: CreateNewsletterDto,
  })
  async subscribe(@Body() createTypeDto: CreateNewsletterDto, @Res() res: any) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Subscribed",
      data: await this.service.subscribeNewsletter(createTypeDto),
    });
  }

  @Post("/news")
//   @Auth([RoleType.ADMIN])
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "News Sent",
    type: SendNewsDto,
  })
  async sendNews(@Body() sendNewsDto: SendNewsDto, @Res() res: any) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "News Sent",
      data: await this.service.sendNews(sendNewsDto),
    });
  }

  @Get()
  @Auth([RoleType.ADMIN])
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get subscriber emails",
    type: NewsletterDto,
    isArray: true,
  })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
    @Res() res: any
  ): Promise<PageDto<NewsletterDto>> {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Record Found",
      subscribers: await this.service.getAllEmails(pageOptionsDto),
    });
  }

  @Delete(":email")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Unsubscribed",
    type: NewsletterDto,
  })
  async remove(@Param("email") email: string, @Res() res: any) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Unsubscribed",
      data: await this.service.deleteByEmail(email),
    });
  }
}
