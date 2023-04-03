"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
const Logging_1 = require("./Logging");
const error = function (error, req, res, next) {
    const statusCode = error.statusCode || 500;
    Logging_1.Logging.error(`Error: [${error.message}] - StatusCode: [${statusCode}]`);
    return res.status(statusCode).json({ status: false, message: error.message });
};
exports.error = error;
