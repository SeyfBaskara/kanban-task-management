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
exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const AppError_1 = require("../utils/AppError");
const Task_1 = __importDefault(require("../models/Task"));
const Column_1 = __importDefault(require("../models/Column"));
const createTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, boardID } = req.body;
    const newTask = new Task_1.default({ title, description, status, boardID });
    try {
        yield newTask.save();
        yield Column_1.default.findOneAndUpdate({ name: status, boardID }, { $push: { tasks: newTask } }, { new: true, runValidators: true });
        res.status(201).json(newTask);
    }
    catch (error) {
        next(error);
    }
});
exports.createTask = createTask;
const getTasks = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield Task_1.default.find();
        if (!task) {
            throw new AppError_1.AppError({
                httpCode: AppError_1.HttpCode.NOT_FOUND,
                description: 'Task is not found',
            });
        }
        res.status(200).json(task);
    }
    catch (error) {
        next(error);
    }
});
exports.getTasks = getTasks;
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowUpdates = ['title', 'description', 'status'];
    const isValidoperation = updates.every((update) => allowUpdates.includes(update));
    try {
        if (!isValidoperation) {
            throw new AppError_1.AppError({
                httpCode: AppError_1.HttpCode.BAD_REQUEST,
                description: 'Invalid task value field update! ',
            });
        }
        const task = yield Task_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) {
            throw new AppError_1.AppError({
                httpCode: AppError_1.HttpCode.NOT_FOUND,
                description: 'Task is not found',
            });
        }
        res.status(201).json(task);
    }
    catch (error) {
        next(error);
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield Task_1.default.findOne({ _id: req.params.id });
        if (!task) {
            throw new AppError_1.AppError({
                httpCode: AppError_1.HttpCode.NOT_FOUND,
                description: 'Task is not found',
            });
        }
        yield task.deleteOne();
        res.status(200).json(task);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTask = deleteTask;
//# sourceMappingURL=task.js.map