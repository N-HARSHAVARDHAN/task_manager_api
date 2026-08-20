import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import env from "./env";
dotenv.config();

const sequelize = new Sequelize(
    env.database.name,
    env.database.user,
    env.database.password,
    {
        host: env.database.host,
        port: env.port,
        dialect: "postgres"
    }
);

export default sequelize;