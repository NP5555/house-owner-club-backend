import "./boilerplate.polyfill";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AcceptLanguageResolver, I18nModule, QueryResolver } from "nestjs-i18n";
import path from "path";
import { DataSource } from "typeorm";
import { addTransactionalDataSource } from "typeorm-transactional";
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


import { AreaModule } from "./modules/area/area.module";
import { AreaEntity } from "./modules/area/entities/area.entity";

import { BuyModule } from "./modules/buy/buy.module";
import { BuyEntity } from "./modules/buy/entities/buy.entity";

import { UserDashboardModule } from "./modules/dashboards/dashboards.module";

import { TradeModule } from "./modules/trade/trade.module";
import { TradeEntity } from "./modules/trade/entities/trade.entity";

import { DocumentModule } from "./modules/userDocuments/documents.module";
import { DocumentEntity } from "./modules/userDocuments/entities/documents.entity";

import { RequestDocumentModule } from "./modules/requestDocument/requestDocument.module";
import { RequestDocumentEntity } from "./modules/requestDocument/entities/requestDocument.entity";

import { DocumentCatalogueModule } from "./modules/documentCatalogue/documentCatalogue.module";
import { DocumentCatalogueEntity } from "./modules/documentCatalogue/entities/documentCatalogue.entity";

import { AuthModule } from "./modules/auth/auth.module";
import { CategoryModule } from "./modules/category/category.module";
import { AgentLandModule } from "./modules/agent-land/agent-land.module";
import { AgentLandEntity } from "./modules/agent-land/entities/agent-land.entity";
import { TypeEntity } from "./modules/type/entities/type.entity";
import { CategoryEntity } from "./modules/category/entities/category.entity";
import { CurrencyModule } from "./modules/currency/currency.module";
import { CurrencyEntity } from "./modules/currency/entities/currency.entity";
import { HealthCheckerModule } from "./modules/health-checker/health-checker.module";
import { ProjectEntity } from "./modules/project/entities/project.entity";
import { ProjectModule } from "./modules/project/project.module";
import { UserEntity } from "./modules/user/user.entity";
import { UserModule } from "./modules/user/user.module";
import { TransactionEntity } from "./modules/transactions/entities/transaction.entity";
import { TransactionModule } from "./modules/transactions/transaction.module";
import { NewsletterEtity } from "./modules/newsletter/entities/newsletter.entity";
import { NewsletterModule } from "./modules/newsletter/newsletter.module";
import { UserSettingsEntity } from "./modules/user/user-settings.entity";
import { UserKYCEntity } from "./modules/user-kyc/entities/user-kyc.entity";
import { TypeModule } from "./modules/type/type.module";
import { UserKYCModule } from "./modules/user-kyc/user-kyc.module";
import { RentEntity } from "./modules/rent/entities/rent.entity";
import { RentModule } from "./modules/rent/rent.module";
import { ApiConfigService } from "./shared/services/api-config.service";
import { SharedModule } from "./shared/shared.module";

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),



    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService): TypeOrmModuleOptions => ({
        ...configService.postgresConfig,
        entities: [
          UserEntity,
          UserSettingsEntity,
          ProjectEntity,
          TransactionEntity,
          CategoryEntity,
          AreaEntity,
          CurrencyEntity,
          UserKYCEntity,
          TypeEntity,
          AgentLandEntity,
          BuyEntity,
          TradeEntity,
          DocumentEntity,
          RequestDocumentEntity,
          DocumentCatalogueEntity,
          RentEntity,
          NewsletterEtity
        ],
        keepConnectionAlive: true,
        logging: ['error', 'warn'] as any,
        synchronize: true,
        ssl: configService.nodeEnv === 'production' ? {
          rejectUnauthorized: false
        } : undefined,
        retryAttempts: 10,
        retryDelay: 3000
      }),
      inject: [ApiConfigService],
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error("Invalid options passed");
        }

        try {
          const dataSource = new DataSource(options);
          return addTransactionalDataSource(await dataSource.initialize());
        } catch (err) {
          console.error('Failed to connect to the database: ', err);
          throw err;
        }
      },
    }),


    I18nModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        fallbackLanguage: configService.fallbackLanguage,
        loaderOptions: {
          path: path.join(__dirname, "../i18n/"),
          watch: configService.isDevelopment,
        },
        resolvers: [
          new QueryResolver(['lang']),
          new AcceptLanguageResolver(),
        ],
      }),
      imports: [SharedModule],
      inject: [ApiConfigService],
    }),
    HealthCheckerModule,
    AreaModule,
    CategoryModule,
    CurrencyModule,
    ProjectModule,
    TransactionModule,
    UserKYCModule,
    TypeModule,
    AgentLandModule,
    BuyModule,
    TradeModule,
    DocumentModule,
    RequestDocumentModule,
    UserDashboardModule,
    DocumentCatalogueModule,
    RentModule,
    NewsletterModule,
    ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', ''),    
      }),
  ],
  providers: [],
})
export class AppModule {}
