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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./database/db"));
const boardRouter_1 = __importDefault(require("./routers/boardRouter"));
const taskRouter_1 = __importDefault(require("./routers/taskRouter"));
const ErrorHandler_1 = require("./middleware/ErrorHandler");
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Basic setup');
}));
app.use('/api/board', boardRouter_1.default);
app.use('/api/task', taskRouter_1.default);
app.use((err, _req, res, _next) => {
    console.log('Error encountered:', err.message || err);
    ErrorHandler_1.errorHandler.handleError(err, res);
});
exports.default = app;
//# sourceMappingURL=index.js.map