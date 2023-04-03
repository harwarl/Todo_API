"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Logging_1 = require("../utils/Logging");
exports.default = ({ db }) => {
    const connect = () => {
        mongoose_1.default.connect(db)
            .then(() => {
            Logging_1.Logging.info('Db Connected Successfully');
        })
            .catch((error) => {
            Logging_1.Logging.error('Error Connecting to DB');
            Logging_1.Logging.error(error);
        });
    };
    connect();
};
