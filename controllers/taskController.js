import { Task } from "../models/index.js";

export async function createTask(req, res) {
    try {
        console.log("createTask controller reached");

        const task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            dueDate: req.body.dueDate,
            status: req.body.status,
            userId: req.body.userId
        });

        res.status(201).json(task);

    } catch (error) {
        console.error("CREATE TASK ERROR:", error);

        res.status(500).json({
            message: "Failed to create task",
            error: error.message
        });
    }
}