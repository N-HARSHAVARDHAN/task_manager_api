import express from 'express'
import sequelize from "./config/database.js"
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
const app = express();

app.use(express.json());
console.log("taskRoutes:", taskRoutes);
app.use("/auth",authRoutes);
app.use("/tasks",taskRoutes);
app.get("/", (req, res) => {
    res.json({
        message: "Task Manager API is running"
    });
});
app.get("/test", (req, res) => {
    res.json({
        message: "Test route works"
    });
});
app.use(errorHandler);

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } 
    catch (error) {
        console.error("Unable to connect to database:");
        console.error(error);
    }
}
startServer();