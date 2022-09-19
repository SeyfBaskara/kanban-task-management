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
const Column_1 = __importDefault(require("./Column"));
const Task_1 = __importDefault(require("./Task"));
const SubTask_1 = __importDefault(require("./SubTask"));
const BoardSchema = new mongoose_1.Schema({
    _id: { type: String, default: uuid_1.v4 },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    boardID: {
        type: String,
    },
    columns: [{ type: String, ref: 'Column' }],
});
BoardSchema.pre('deleteOne', { document: true }, function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Column_1.default.deleteMany({ boardID: this.boardID });
        yield Task_1.default.deleteMany({ boardID: this.boardID });
        yield SubTask_1.default.deleteMany({ boardID: this.boardID });
        next();
    });
});
BoardSchema.set('toJSON', {
    transform: function (_doc, ret, _options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});
const Board = (0, mongoose_1.model)('Board', BoardSchema);
exports.default = Board;
//# sourceMappingURL=Board.js.map