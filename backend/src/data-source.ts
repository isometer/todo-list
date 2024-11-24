import "reflect-metadata";
import { DataSource } from "typeorm";
import { Section } from "./entity/Section";
import { Item } from "./entity/Item";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({
    path: `.env.${process.env.NODE_ENV || 'development'}`, // Dynamically choose the .env file based on NODE_ENV
});

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,  // Default to localhost if not set
  port: parseInt(process.env.DB_PORT || "5432"), // Default to 5432 if not set
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNC === "true", // Set to false in production
  logging: true, // Set to true if you want query logging
  entities: [Section, Item],
  migrations: ["src/migration/**/*.ts"], // Add migrations folder if you have migrations
  subscribers: [], // Add if you plan to use subscribers
});