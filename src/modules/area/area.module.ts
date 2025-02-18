import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { AreaEntity } from "./entities/area.entity";

import { ProjectEntity } from "../project/entities/project.entity";
// import { AreaManagePolicyProvider } from "./handlers/Area-manage-policy.provider";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, AreaEntity]),
  ],
  controllers: [AreaController],
  providers: [AreaService]
})
export class AreaModule {}
