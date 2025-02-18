import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RequestDocumentService } from "./requestDocument.service";
import { RequestDocumentController } from "./requestDocument.controller";
import { RequestDocumentEntity } from "./entities/requestDocument.entity";

import { ProjectEntity } from "../project/entities/project.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, RequestDocumentEntity])],
  controllers: [RequestDocumentController],
  providers: [RequestDocumentService],
})
export class RequestDocumentModule {}
