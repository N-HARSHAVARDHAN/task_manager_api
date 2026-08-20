import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import env from "./env.js";
dotenv.config();

const sequelize = new Sequelize(
    env.database.name,
    env.database.user,
    env.database.password,
    {
        host: env.database.host,
        port: env.database.port,
        dialect: "postgres"
    }
);

export default sequelize;