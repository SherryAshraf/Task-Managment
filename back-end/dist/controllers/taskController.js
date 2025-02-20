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
const taskService_1 = __importDefault(require("../services/taskService"));
exports.createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        };
        const task = yield taskService_1.default.createTask(insertTaskDto);
        return res.status(200).json(task);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var tasks = yield taskService_1.default.getAllTasks(req.query);
        return res.status(200).json(tasks);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = req.body;
    const taskId = req.params.id;
    console.log(reqBody);
    const task = yield taskService_1.default.updateTask(taskId, reqBody);
    return res.status(200).json(task);
});
exports.deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var tasks = yield taskService_1.default.deleteTask(req.params.id);
        return res.status(200).json(tasks);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var tasks = yield taskService_1.default.getTaskById(req.params.id);
        return res.status(200).json(tasks);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
