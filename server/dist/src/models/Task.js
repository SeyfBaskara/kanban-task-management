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
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const SubTask_1 = __importDefault(require("./SubTask"));
const TaskSchema = new mongoose_1.Schema({
    _id: { type: String, default: uuid_1.v4 },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        lowercase: true,
    },
    boardID: {
        type: String,
    },
    subtasks: [{ type: String, ref: 'SubTask' }],
});
TaskSchema.pre('deleteOne', { document: true }, function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield SubTask_1.default.deleteMany({ status: this.status });
        next();
    });
});
TaskSchema.set('toJSON', {
    transform: function (_doc, ret, _options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});
const Task = (0, mongoose_1.model)('Task', TaskSchema);
exports.default = Task;
//# sourceMappingURL=Task.js.map