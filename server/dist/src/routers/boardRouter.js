"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const board_1 = require("../controllers/board");
const column_1 = require("../controllers/column");
const router = express_1.default.Router();
// Board routers
router.post('/create', board_1.createBoard);
router.get('/', board_1.getBoard);
router.delete('/delete/:id', board_1.deleteBoard);
router.patch('/update/:id', board_1.updateBoard);
// Column routers
router.post('/create/column', column_1.createColumn);
router.delete('/delete/column/:id', column_1.deleteColumn);
router.patch('/update/column/:id', column_1.updateColumn);
exports.default = router;
//# sourceMappingURL=boardRouter.js.map