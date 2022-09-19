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
Object.defineProperty(exports, "__esModule", { value: true });
exports.exitHandler = void 0;
const server_1 = require("../../server");
class ExitHandler {
    handleExit(code, timeout = 5000) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Attempting a graceful shutdown with code ${code}`);
                setTimeout(() => {
                    console.log(`Forcing a shutdown with code ${code}`);
                    process.exit(code);
                }, timeout).unref();
                if (server_1.server.listening) {
                    console.log('Terminating HTTP connections');
                    yield server_1.httpTerminator.terminate();
                }
                console.log(`Exiting gracefully with code ${code}`);
                process.exit(code);
            }
            catch (error) {
                console.log('Error shutting down gracefully');
                console.log(error);
                console.log(`Forcing exit with code ${code}`);
                process.exit(code);
            }
        });
    }
}
exports.exitHandler = new ExitHandler();
//# sourceMappingURL=ExitHandler.js.map