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
exports.deleteSubtask = exports.updateSubtask = exports.getSubtasks = exports.createSubtask = void 0;
const AppError_1 = require("../utils/AppError");
const SubTask_1 = __importDefault(require("../models/SubTask"));
const Task_1 = __importDefault(require("../models/Task"));
const createSubtask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, isCompleted, status } = req.body;
    const task = yield Task_1.default.findOne({ status });
    const newSubtask = new SubTask_1.default({ title, isCompleted, status, boardID: task === null || task === void 0 ? void 0 : task.boardID });
    try {
        yield newSubtask.save();
        yield Task_1.default.findOneAndUpdate({ status }, { $push: { subtasks: newSubtask } }, { new: true, runValidators: true });
        res.status(201).json(newSubtask);
    }
    catch (error) {
        next(error);
    }
});
exports.createSubtask = createSubtask;
const getSubtasks = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subtask = yield SubTask_1.default.find();
        if (!subtask) {
            throw new AppError_1.AppError({
                httpCode: AppError_1.HttpCode.NOT_FOUND,
                description: 'Subtask is not found',
            });
        }
        res.status(200).json(subtask);
    }
    catch (error) {
        next(error);
    }
});
exports.getSubtasks = getSubtasks;
const updateSubtask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowUpdates = ['title', 'isCompleted', 'status'];
    const isValidoperation = updates.every((update) => allowUpdates.includes(update));
    try {
        if (!isValidoperation) {
            throw new AppError_1.AppError({
                httpCode: AppError_1.HttpCode.BAD_REQUEST,
                description: 'Invalid subtask value field update! ',
            });
        }
        const subtask = yield SubTask_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!subtask) {
            throw new AppError_1.AppError({
                httpCode: AppError_1.HttpCode.NOT_FOUND,
                description: 'Subtask is not found',
            });
        }
        res.status(201).json(subtask);
    }
    catch (error) {
        next(error);
    }
});
exports.updateSubtask = updateSubtask;
const deleteSubtask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subtask = yield SubTask_1.default.findByIdAndDelete(req.params.id);
        if (!subtask) {
            throw new AppError_1.AppError({
                httpCode: AppError_1.HttpCode.NOT_FOUND,
                description: 'Subtask is not found',
            });
        }
        res.status(200).json(subtask);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteSubtask = deleteSubtask;
//# sourceMappingURL=subTask.js.map