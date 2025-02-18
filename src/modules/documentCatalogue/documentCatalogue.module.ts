import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentCatalogueService } from "./documentCatalogue.service";
import { DocumentCatalogueController } from "./documentCatalogue.controller";
import { DocumentCatalogueEntity } from "./entities/documentCatalogue.entity";

import { UserEntity } from "../user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, DocumentCatalogueEntity])],
  controllers: [DocumentCatalogueController],
  providers: [DocumentCatalogueService],
})
export class DocumentCatalogueModule {}
