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
exports.deleteBoard = exports.updateBoard = exports.getBoard = exports.createBoard = void 0;
const AppError_1 = require("../utils/AppError");
const Board_1 = __importDefault(require("../models/Board"));
const createBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, boardID } = req.body;
    const newBoard = new Board_1.default({ name, boardID });
    try {
        yield newBoard.save();
        res.status(201).json(newBoard);
    }
    catch (error) {
        next(error);
    }
});
exports.createBoard = createBoard;
const getBoard = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boards = yield Board_1.default.find({}).populate({
            path: 'columns',
            model: 'Column',
            populate: {
                path: 'tasks',
                model: 'Task',
                populate: {
                    path: 'subtasks',
                    model: 'SubTask',
                },
            },
        });
        res.status(200).json(boards);
    }
    catch (error) {
        next(error);
    }
});
exports.getBoard = getBoard;
const updateBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowUpdates = ['name'];
    const isValidoperation = updates.every((update) => allowUpdates.includes(update));
    try {
        if (!isValidoperation) {
            throw new AppError_1.AppError({
                httpCode: AppError_1.HttpCode.BAD_REQUEST,
                description: 'Invalid board value field updates!',
            });
        }
        const board = yield Board_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!board) {
            throw new AppError_1.AppError({
                httpCode: AppError_1.HttpCode.NOT_FOUND,
                description: 'Board is not found!',
            });
        }
        res.status(201).json(board);
    }
    catch (error) {
        next(error);
    }
});
exports.updateBoard = updateBoard;
const deleteBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const board = yield Board_1.default.findOne({ _id: req.params.id });
        if (!board) {
            throw new AppError_1.AppError({
                httpCode: AppError_1.HttpCode.NOT_FOUND,
                description: 'Board is not found',
            });
        }
        yield board.deleteOne();
        res.status(200).json(board);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBoard = deleteBoard;
//# sourceMappingURL=board.js.map