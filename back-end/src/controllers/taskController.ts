import taskService from "../services/taskService";
import { Request, Response } from "express";


exports.createTask  = async (req: Request, res: Response) => {
    try {
        const reqBody = req.body;
        if (!reqBody.title || reqBody.title == "") {
            var errorResponse = {
                Status: "Invalid",
                Response: null,
                Errors: [
                    {
                        Status: "MissingData",
                        Key: "title",
                        Description: "Title is required",
                    },
                ],
            };
           return res.status(400).json(errorResponse);

        }
        var insertTaskDto = {
            title: reqBody.title !== undefined ? reqBody.title : "",
            description: reqBody.description !== undefined ? reqBody.description : ""

        }
        const task = await taskService.createTask(insertTaskDto);
       return res.status(200).json(task);

    }
    catch (error) {
        return  res.status(500).json({ message: error })
    }
}

exports.getAllTasks = async (req: Request, res: Response) => {
    try {
        var tasks = await taskService.getAllTasks(req.query);
        return res.status(200).json(tasks);

    }
    catch (error) {
        return res.status(500).json({ message: error })

    }
}

exports.updateTask = async (req: Request, res: Response) => {
    const reqBody = req.body;
    const taskId = req.params.id
console.log(reqBody);
   
    const task = await taskService.updateTask(taskId, reqBody);
    return res.status(200).json(task);
}

exports.deleteTask = async (req: Request, res: Response) => {
    try {
        var tasks = await taskService.deleteTask(req.params.id);
        return  res.status(200).json(tasks);
    }
    catch (error) {
        return  res.status(500).json({ message: error })

    }
}

exports.getTaskById = async (req: Request, res: Response) => {
    try {
        var tasks = await taskService.getTaskById(req.params.id);
        return res.status(200).json(tasks);
    }
    catch (error) {
        return  res.status(500).json({ message: error })

    }
}