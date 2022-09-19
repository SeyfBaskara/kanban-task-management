"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const SubTaskSchema = new mongoose_1.Schema({
    _id: { type: String, default: uuid_1.v4 },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    isCompleted: {
        type: Boolean,
    },
    status: {
        type: String,
        required: true,
        lowercase: true,
    },
    boardID: {
        type: String,
    },
});
SubTaskSchema.set('toJSON', {
    transform: function (_doc, ret, _options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});
const SubTask = (0, mongoose_1.model)('SubTask', SubTaskSchema);
exports.default = SubTask;
//# sourceMappingURL=SubTask.js.map