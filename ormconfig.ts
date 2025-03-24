dotenv.config();
import "./src/boilerplate.polyfill";

import dotenv from "dotenv";
import { DataSource } from "typeorm";

import { UserSubscriber } from "./src/entity-subscribers/user-subscriber";
import { SnakeNamingStrategy } from "./src/snake-naming.strategy";


export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  name: "migrations",
  namingStrategy: new SnakeNamingStrategy(),
  subscribers: [UserSubscriber],
  entities: [
    __dirname + "/src/modules/**/*.entity{.ts,.js}",
    __dirname + "/src/modules/**/*.view-entity{.ts,.js}",
  ],
  migrations: [__dirname + "/src/database/migrations/*{.ts,.js}"],
  synchronize: true,
  logging: true,
  ssl: false,
});
