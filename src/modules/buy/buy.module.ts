import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyService } from './buy.service';
import { BuyController } from './buy.controller';
import { BuyEntity } from "./entities/buy.entity";
import { ProjectEntity } from "../project/entities/project.entity";

// import { ProjectEntity } from "../project/entities/project.entity";
// import { BuyManagePolicyProvider } from "./handlers/buy-manage-policy.provider";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, BuyEntity]), 
  ],
  controllers: [BuyController],
  providers: [BuyService]
})
export class BuyModule {}
