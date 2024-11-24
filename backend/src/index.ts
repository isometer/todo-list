import "reflect-metadata";
import express from "express";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

// Load environment variables
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

// Create a new data source (connects to PostgreSQL)
const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.DB_SYNC === "true", // Automatically syncs database schema (turn off in production)
    logging: true,
    entities: ["src/entity/*.ts"],
});

// Initialize the database and start the server
const startServer = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Connected to the database");

        const app = express();
        app.use(express.json());

        app.get("/", (req, res) => res.send("Server is running!"));

        app.listen(3000, () => console.log("Server running on http://localhost:3000"));
    } catch (error) {
        console.error("Error starting server:", error);
    }
};

startServer();
