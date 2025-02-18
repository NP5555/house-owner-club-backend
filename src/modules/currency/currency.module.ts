import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { CurrencyEntity } from "./entities/currency.entity";

import { ProjectEntity } from "../project/entities/project.entity";
// import { CurrencyManagePolicyProvider } from "./handlers/Currency-manage-policy.provider";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, CurrencyEntity]),
  ],
  controllers: [CurrencyController],
  providers: [CurrencyService]
})
export class CurrencyModule {}
