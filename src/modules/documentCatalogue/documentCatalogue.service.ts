import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IFile } from "../../interfaces";
import { DocumentCatalogueEntity } from "./entities/documentCatalogue.entity";
import { AbstractService } from "../../common/abstract.service";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class DocumentCatalogueService extends AbstractService<DocumentCatalogueEntity> {
  constructor(
    @InjectRepository(DocumentCatalogueEntity)
    private DocumentCatalogueEntityRepository: Repository<DocumentCatalogueEntity>
  ) {
    super(DocumentCatalogueEntityRepository);
  }

  async save(userId: string, isAdmin: boolean, file: IFile) {
    try {
      let DocumentEntity: any;
      if (file) {
        const uploadsDirectory = "uploads";
        const filename = Date.now() + "_" + file.originalname;
        const filePath = path.join(uploadsDirectory, filename);

        if (!fs.existsSync(uploadsDirectory)) {
          fs.mkdirSync(uploadsDirectory, { recursive: true });
        }

        fs.writeFileSync(filePath, file.buffer);

        DocumentEntity = this.DocumentCatalogueEntityRepository.create({
          document: filePath,
          name: file.originalname,
          isAdmin: isAdmin,
          userId: userId,
        });
      }

      await this.DocumentCatalogueEntityRepository.save(DocumentEntity);
      return DocumentEntity;
    } catch (error) {
      throw new HttpException("Record not added", HttpStatus.BAD_REQUEST);
    }
  }

  async findAllPageOptions(): Promise<any> {
    const queryBuilder =
      this.DocumentCatalogueEntityRepository.createQueryBuilder(
        "documentCatalogue"
      );
    queryBuilder.leftJoinAndSelect("documentCatalogue.user", "user");
    queryBuilder.where("documentCatalogue.isAdmin = :isAdmin", {
      isAdmin: true,
    });
    const documents = await queryBuilder.getMany();
    if (documents.length > 0) {
      return documents;
    } else {
      throw new HttpException("Record not found", HttpStatus.NOT_FOUND);
    }
  }

  async findAllByUserId(userId: string): Promise<any> {
    const queryBuilder =
      this.DocumentCatalogueEntityRepository.createQueryBuilder(
        "documentCatalogue"
      );
    queryBuilder.leftJoinAndSelect("documentCatalogue.user", "user");

    queryBuilder.andWhere("user.id = :userId", { userId });

    const documents = await queryBuilder.getMany();

    if (documents.length > 0) {
      return documents;
    } else {
      throw new HttpException("Record not found", HttpStatus.NOT_FOUND);
    }
  }
}
