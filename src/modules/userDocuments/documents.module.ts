import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentService } from './documents.service';
import { DocumentController } from './documents.controller';
import { DocumentEntity } from "./entities/documents.entity";

import { ProjectEntity } from "../project/entities/project.entity";
// import { AreaManagePolicyProvider } from "./handlers/Area-manage-policy.provider";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, DocumentEntity]),
  ],
  controllers: [DocumentController],
  providers: [DocumentService]
})
export class DocumentModule {}
