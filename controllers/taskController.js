import { Task } from "../models/index.js";
import { Op } from "sequelize";

export async function createTask(req, res, next) {
    try {
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
        next(error)
    }
}

export async function getTasks(req, res,next) {
    try {
        const page = Number(req.query.page)||1;
        const limit = Number(req.query.limit) || 10;

        if(!Number.isInteger(page) || page<1){
            return res.status(400).json({
                message:"invalid page"
            });
        }
        if(!Number.isInteger(limit) || limit<1 || limit >100){
            return res.status(400).json({
                message:"invalid limit"
            });
        }
        const offset = (page -1) * limit;

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
            where,
            limit,offset
        };

        if(sortBy){
            options.order =[[sortBy,order ||"ASC"]];
        }

        const {rows , count} = await Task.findAndCountAll(options);
        const totalPages = Math.ceil(count/limit);

        res.status(200).json({
            tasks:rows,
            pagination:{
                page,
                limit,
                totalTasks:count,
                totalPages
            }
        });

    } catch (error) {
        next(error);
    }
}

export async function getTask(req, res,next) {
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
        next(error);
    }

}

export async function updateTask(req, res,next) {
    try {
        const task = await Task.findOne({
            where: {
                id: req.params.id,
                userId: req.user.userId
            }
        });
        if (!task) {
            return res.status(404).json({
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
        next(error);
    }

}

export async function deleteTask(req, res,next) {
    try {
        const task = await Task.findOne({
            where: {
                id: req.params.id,
                userId: req.user.userId
            }
        });
        if (!task) {
            return res.status(404).json({
                message: "not found"
            });
        }
        await task.destroy();
        res.status(200).json({
            message: "task deleted sucessfully"
        });
    }
    catch (error) {
       next(error);
    }
}