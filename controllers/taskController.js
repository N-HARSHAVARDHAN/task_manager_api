import { Task } from "../models/index.js";
import { Op } from "sequelize";

export async function createTask(req, res) {
    try {
        console.log("createTask controller reached");

        const task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            dueDate: req.body.dueDate,
            status: req.body.status,
            userId: req.user.userId
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

export async function getTasks(req, res) {
    try {

        const where = {
            userId: req.user.userId
        };

        const allowedPriorities = ['low', 'medium', 'high'];

        if (req.query.priority) {

            if (!allowedPriorities.includes(req.query.priority)) {
                return res.status(400).json({
                    message: "invalid priority"
                });
            }

            where.priority = req.query.priority
        }

        const allowedStatueses = ["pending", "completed"];

        if (req.query.status) {

            if (!allowedStatueses.includes(req.query.status)) {
                return res.status(400).json({
                    message: "invalid status"
                });
            }

            where.status = req.query.status;
        }
        if (req.query.dueDateFrom || req.query.dueDateTo) {

            if (req.query.dueDateFrom && isNaN(Date.parse(req.query.dueDateFrom))) {
                return res.status(400).json({
                    message: 'invalid duedatefrom'
                });
            }
            if (req.query.dueDateTo && isNaN(Date.parse(req.query.dueDateTo))) {
                return res.status(400).json({
                    message: "invalid duedateto"
                });
            }

            where.dueDate = {};

            if (req.query.dueDateFrom) {
                where.dueDate[Op.gte] = req.query.dueDateFrom;
            }
            if (req.query.dueDateTo) {
                where.dueDate[Op.lte] = req.query.dueDateTo;
            }

        }
        const allowedSorts = ["dueDate", "priority"];

        let sortBy;
        let order;

        if (req.query.sortBy) {

            if (!allowedSorts.includes(req.query.sortBy)) {
                return res.status(400).json({
                    message: "invalid sorting"
                });
            }
            sortBy = req.query.sortBy;

            if (req.query.order) {

                const requestedOrder = req.query.order.toUpperCase();

                if (requestedOrder !== "ASC" && requestedOrder !== "DESC") {
                    return res.status(400).json({
                        message: "invalid order"
                    });
                }
                order = requestedOrder;
            }
        }
        
        const options = {
            where
        };

        if(sortBy){
            options.order =[sortBy,order ||"ASC"];
        }

        const tasks = await Task.findAll({options});
        res.status(200).json(tasks);

    } catch (error) {
        console.error("GET TASKS ERROR:", error);

        res.status(500).json({
            message: "Failed to fetch tasks",
            error: error.message
        });
    }
}

export async function getTask(req, res) {
    try {
        const task = await Task.findOne({
            where: {
                id: req.params.id,
                userId: req.user.userId
            }
        });
        if (!task) {
            return res.status(404).json({
                message: "task not found"
            });
        }
        res.status(200).json(task);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'failed to fetch task',
            error: error.message
        });
    }

}

export async function updateTask(req, res) {
    try {
        const task = await Task.findOne({
            where: {
                id: req.params.id,
                userId: req.user.userId
            }
        });
        if (!task) {
            res.status(404).json({
                message: "not found"
            });
        }
        await task.update({
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            dueDate: req.body.dueDate,
            status: req.body.status
        });
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({
            message: "failed to update task",
            error: error.message
        });
    }

}

export async function deleteTask(req, res) {
    try {
        const task = await Task.findOne({
            where: {
                id: req.params.id,
                userId: req.user.userId
            }
        });
        if (!task) {
            res.status(404).json({
                message: "not found"
            });
        }
        await task.destroy();
        res.status(200).json({
            message: "task deleted sucessfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'failed to fetch',
            error: error.message
        });
    }
}