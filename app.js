import express from 'express'
import sequelize from "./config/database.js"
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import { errorHandler } from './middleware/errorMiddleware.js';
import swaggerSpec from './config/swagger.js';
import swaggerUi from "swagger-ui-express";
import logger from './utils/logger.js';
import env from './config/env.js';
dotenv.config();
const app = express();

app.use(express.json());
app.use("/auth",authRoutes);
app.use("/tasks",taskRoutes);
app.get("/", (req, res) => {
    res.json({
        message: "Task Manager API is running"
    });
});
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

async function startServer() {
    try {
        await sequelize.authenticate();
        logger.log("Database connected successfully");

        const PORT = env.port || 5000;

        app.listen(PORT, () => {
            logger.log(`Server running on port ${PORT}`);
        });
    } 
    catch (error) {
        logger.error("Unable to connect to database:");
        logger.error(error);
    }
}
startServer();