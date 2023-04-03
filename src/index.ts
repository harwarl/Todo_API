import express, { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { AppRouter } from './AppRouter';
import { config } from './config/config';
import { Logging } from './utils/Logging';
import { error } from './middleware/Error';
import connect from './repository/DB';
import './controllers/TodoController';
import './controllers/RootController';

const app: Application= express();

//set Up logger
app.use((req: Request, res: Response, next: NextFunction):void=>{
    Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', ()=>{
        Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - StatusCode: [${res.statusCode}]`);
    })
    next();
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//set up router middleware
app.use(AppRouter.getInstance());
//Error Handler
app.use(error);

app.listen(config.PORT, ():void=>{
    Logging.info(`App is listening on Port ${config.PORT}`)
})

const db = config.MONGO_URL || '';
connect({db});