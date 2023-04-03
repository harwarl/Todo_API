"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const AppRouter_1 = require("./AppRouter");
const config_1 = require("./config/config");
const Logging_1 = require("./utils/Logging");
const Error_1 = require("./middleware/Error");
const DB_1 = __importDefault(require("./repository/DB"));
require("./controllers/TodoController");
require("./controllers/RootController");
const app = (0, express_1.default)();
//set Up logger
app.use((req, res, next) => {
    Logging_1.Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        Logging_1.Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - StatusCode: [${res.statusCode}]`);
    });
    next();
});
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
//set up router middleware
app.use(AppRouter_1.AppRouter.getInstance());
//Error Handler
app.use(Error_1.error);
app.listen(config_1.config.PORT, () => {
    Logging_1.Logging.info(`App is listening on Port ${config_1.config.PORT}`);
});
const db = config_1.config.MONGO_URL || '';
(0, DB_1.default)({ db });
