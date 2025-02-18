import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectEntity } from './entities/project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { CategoryEntity } from "../category/entities/category.entity";
// import { AreaEntity } from "../area/entities/area.entity";
import { CurrencyEntity } from "../currency/entities/currency.entity";
import { TypeEntity } from "../type/entities/type.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, TypeEntity, CurrencyEntity, CategoryEntity]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
