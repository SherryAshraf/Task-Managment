import Task from "../models/task";


class TaskService {

    async createTask(insertTaskDto: any) {
        //console.log(insertTaskDto);
        try {
            const createdTask = await Task.create(insertTaskDto);
            return {
                Status: "Succeeded",
                Response: createdTask,
                Error: null
            };
        }
        catch (error) {
            throw error;

        }

    }


    async getTaskById(id: any) {

        var task = await Task.findById(id);

        if (task != null) {
            return {
                Status: "Succeeded",
                Response: task,
                Error: null
            };

        }
        else {
            return {
                Status: "Invalid",
                Response: "Task Not found ",
                Errors: [
                    {
                        Status: "IdNotExist",
                        Key: "Id",
                        Description: "task is not exist",
                    },
                ],
            };
        }
    }


    async updateTask(id: any,updateTaskDto :any) {
        try {
            var task = await Task.findById(id)

            if (!task) {
                return {
                    Status: "Invalid",
                    Response: null,
                    Errors: [
                        {
                            Status: "IdNotExist",
                            Key: "Id",
                            Description: "task is not exist",
                        },
                    ],
                };
            }
            console.log(updateTaskDto);

            var newUpdatedTaskDto = {
                title: updateTaskDto.title == undefined ?  task.title:updateTaskDto.title,
                description: updateTaskDto.description == undefined ? task.description:updateTaskDto.description ,
                completed: updateTaskDto.completed == undefined?task.completed:updateTaskDto.completed
            };

            console.log(newUpdatedTaskDto);
            var updatedTask=await Task.findByIdAndUpdate(id,newUpdatedTaskDto,{new:true});
            //var updatedTask = await Task.findById(id);
            console.log(updatedTask);
            return {
                Status: "Succeeded",
                Response: updatedTask,
                Error: null
            };
        }
        catch (error) {
            throw error;

        }
    }


    async deleteTask(id: any) {

        try {
            var task = await Task.findById(id);

            if (task != null) {

                await Task.findByIdAndDelete(id);
                return {
                    Status: "Succeeded",
                    Response: null,
                    Errors: null,
                };

            }
            else {
                return {
                    Status: "Invalid",
                    Response: null,
                    Errors: [
                        {
                            Status: "IdNotExist",
                            Key: "Id",
                            Description: "task is not exist",
                        },
                    ],
                };
            }
        }
        catch (error) {
            throw error;
        }

    }

    async getAllTasks(taskSearchDto: any) {

        const taskQuery = new Object();
        if (taskSearchDto.completed !== undefined) {
            (taskQuery as any).completed = taskSearchDto.completed;
        }

        if (taskSearchDto.title) {
            (taskQuery as any).title = { $regex: new RegExp(taskSearchDto.title, "i") }
        }
        //console.log(taskQuery);
        const tasks = await Task.find(taskQuery);
       // console.log(tasks);


        return {
            Status: "Succeeded",
            Response: tasks,
            Errors: null,
        };
    }

}
export default new TaskService();