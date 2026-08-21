import env from "./envConfig.js";

export default {
        username: env.database.user,
        password: env.database.password,
        database: env.database.name,
        host: env.database.host,
        port: env.database.port,
        dialect: "postgres"
};