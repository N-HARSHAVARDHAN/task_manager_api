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
        const tasks = await Task.findAll(
            {
                where:{
                    userId:req.user.userId
                }
            }
        );

        res.status(200).json(tasks);

    } catch (error) {
        console.error("GET TASKS ERROR:", error);

        res.status(500).json({
            message: "Failed to fetch tasks",
            error: error.message
        });
    }
}

export async function getTask(req,res) {
    try{
        const task = await Task.findOne({
            where:{
                id:req.params.id,
                userId:req.user.userId
            }
        });
        if(!task){
            return res.status(404).json({
                message:"task not found"
            });
        }
        res.status(200).json(task);
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            message:'failed to fetch task',
            error:error.message
        });
    }
    
}

export async function updateTask(req,res) {
    try{
        const task = await Task.findOne({
            where:{
                id:req.params.id,
                userId:req.user.userId
            }
        });
        if(!task){
            res.status(404).json({
                message:"not found"
            });
        }
        await task.update({
            title:req.body.title,
            description:req.body.description,
            priority:req.body.priority,
            dueDate:req.body.dueDate,
            status:req.body.status
        });
        res.status(200).json(task);
    }
    catch(error){
        res.status(500).json({
            message:"failed to update task",
            error:error.message
        });
    }

}

export async function deleteTask(req,res) {
    try{
        const task = await Task.findOne({
            where:{
                id:req.params.id,
                userId:req.user.userId
            }
        });
        if(!task){
            res.status(404).json({
                message:"not found"
            });
        }
        await task.destroy();
        res.status(200).json({
            message:"task deleted sucessfully"
        });
    }
    catch(error){
        res.status(500).json({
            message:'failed to fetch',
            error:error.message
        });
    }
}