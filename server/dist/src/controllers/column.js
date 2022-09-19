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
exports.deleteColumn = exports.updateColumn = exports.createColumn = void 0;
const AppError_1 = require("../utils/AppError");
const Column_1 = __importDefault(require("../models/Column"));
const Board_1 = __importDefault(require("../models/Board"));
const createColumn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, boardID } = req.body;
    const newColumn = new Column_1.default({ name, boardID });
    try {
        yield newColumn.save();
        yield Board_1.default.findOneAndUpdate({ boardID: newColumn.boardID }, { $push: { columns: newColumn } }, { new: true, runValidators: true });
        res.status(201).json(newColumn);
    }
    catch (error) {
        next(error);
    }
});
exports.createColumn = createColumn;
const updateColumn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowUpdates = ['name'];
    const isValidoperation = updates.every((update) => allowUpdates.includes(update));
    try {
        if (!isValidoperation) {
            throw new AppError_1.AppError({
                httpCode: AppError_1.HttpCode.BAD_REQUEST,
                description: 'Invalid value field updates!',
            });
        }
        const column = yield Column_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!column) {
            throw new AppError_1.AppError({
                httpCode: AppError_1.HttpCode.NOT_FOUND,
                description: 'Column is not found!',
            });
        }
        res.status(201).json(column);
    }
    catch (error) {
        next(error);
    }
});
exports.updateColumn = updateColumn;
const deleteColumn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const column = yield Column_1.default.findOne({ _id: req.params.id });
        if (!column) {
            throw new AppError_1.AppError({
                httpCode: AppError_1.HttpCode.NOT_FOUND,
                description: 'Column is not found',
            });
        }
        yield column.deleteOne();
        res.status(200).json(column);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteColumn = deleteColumn;
//# sourceMappingURL=column.js.map