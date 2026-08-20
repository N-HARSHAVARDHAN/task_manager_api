import express from "express";
import {
    createTask,
    deleteTask,
    getTask,
    getTasks,
    updateTask
} from "../controllers/taskController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateTask } from "../middleware/taskValidation.js";

const router = express.Router();

router.post("/", authMiddleware,validateTask,createTask);
router.get("/", authMiddleware,getTasks);
router.get("/:id", authMiddleware ,getTask);
router.put("/:id", authMiddleware, validateTask, updateTask);
router.delete("/:id",authMiddleware ,deleteTask);

export default router;