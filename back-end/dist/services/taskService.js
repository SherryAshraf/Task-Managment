"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = __importDefault(require("../models/task"));
class TaskService {
    createTask(insertTaskDto) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(insertTaskDto);
            try {
                const createdTask = yield task_1.default.create(insertTaskDto);
                return {
                    Status: "Succeeded",
                    Response: createdTask,
                    Error: null
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    getTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var task = yield task_1.default.findById(id);
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
        });
    }
    updateTask(id, updateTaskDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var task = yield task_1.default.findById(id);
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
                    title: updateTaskDto.title == undefined ? task.title : updateTaskDto.title,
                    description: updateTaskDto.description == undefined ? task.description : updateTaskDto.description,
                    completed: updateTaskDto.completed == undefined ? task.completed : updateTaskDto.completed
                };
                console.log(newUpdatedTaskDto);
                var updatedTask = yield task_1.default.findByIdAndUpdate(id, newUpdatedTaskDto, { new: true });
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
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var task = yield task_1.default.findById(id);
                if (task != null) {
                    yield task_1.default.findByIdAndDelete(id);
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
        });
    }
    getAllTasks(taskSearchDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskQuery = new Object();
            if (taskSearchDto.completed !== undefined) {
                taskQuery.completed = taskSearchDto.completed;
            }
            if (taskSearchDto.title) {
                taskQuery.title = { $regex: new RegExp(taskSearchDto.title, "i") };
            }
            //console.log(taskQuery);
            const tasks = yield task_1.default.find(taskQuery);
            // console.log(tasks);
            return {
                Status: "Succeeded",
                Response: tasks,
                Errors: null,
            };
        });
    }
}
exports.default = new TaskService();
