import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { TypeEntity } from "./entities/type.entity";
import { ProjectEntity } from "../project/entities/project.entity";

// import { ProjectEntity } from "../project/entities/project.entity";
// import { TypeManagePolicyProvider } from "./handlers/Type-manage-policy.provider";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, TypeEntity]),
  ],
  controllers: [TypeController],
  providers: [TypeService]
})
export class TypeModule {}
