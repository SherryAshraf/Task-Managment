"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./config/connection"));
const cors_1 = __importDefault(require("cors"));
const taskRoute_1 = __importDefault(require("./routes/taskRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)({ origin: "*", methods: "GET,POST,DELETE,PUT", allowedHeaders: "Content-Type" }));
app.use(express_1.default.json());
(0, connection_1.default)().then(() => {
    app.use('/tasks', taskRoute_1.default);
    app.get('/', (req, res) => {
        res.send('Task Manager App is working fine :)');
    });
    app.listen(PORT, () => console.log(`Task Manager App Is running on port ${PORT}`));
});
exports.default = app;
