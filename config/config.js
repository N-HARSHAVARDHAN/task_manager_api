import dotenv from "dotenv";
import env from "./env";
dotenv.config();

export default {
        username: env.database.user,
        password: env.database.password,
        database: env.database.name,
        host: env.database.host,
        port: env.port,
        dialect: "postgres"
};