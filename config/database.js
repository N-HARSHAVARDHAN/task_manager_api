import { Sequelize } from "sequelize";

import env from "./envConfig.js";

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