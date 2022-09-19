"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpTerminator = exports.server = void 0;
require("dotenv/config");
const http_1 = __importDefault(require("http"));
const http_terminator_1 = require("http-terminator");
const index_1 = __importDefault(require("./src/index"));
require("./src/utils/process");
const PORT = process.env.PORT || 5001;
exports.server = http_1.default.createServer(index_1.default);
exports.httpTerminator = (0, http_terminator_1.createHttpTerminator)({ server: exports.server });
exports.server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map