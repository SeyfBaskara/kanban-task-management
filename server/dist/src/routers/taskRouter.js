"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_1 = require("../controllers/task");
const subTask_1 = require("../controllers/subTask");
const router = express_1.default.Router();
// Tasks Routers
router.post('/create', task_1.createTask);
router.get('/', task_1.getTasks);
router.patch('/update/:id', task_1.updateTask);
router.delete('/delete/:id', task_1.deleteTask);
//Subtasks Routers
router.post('/subtask/create', subTask_1.createSubtask);
router.get('/subtasks', subTask_1.getSubtasks);
router.patch('/subtask/update/:id', subTask_1.updateSubtask);
router.delete('/subtask/delete/:id', subTask_1.deleteSubtask);
exports.default = router;
//# sourceMappingURL=taskRouter.js.map