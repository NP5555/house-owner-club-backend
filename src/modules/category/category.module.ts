import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryEntity } from "./entities/category.entity";
import { ProjectEntity } from "../project/entities/project.entity";

// import { ProjectEntity } from "../project/entities/project.entity";
// import { CategoryManagePolicyProvider } from "./handlers/category-manage-policy.provider";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, CategoryEntity]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
