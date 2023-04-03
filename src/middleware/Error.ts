import {Request, Response, NextFunction} from "express";
import { Logging } from "../utils/Logging";

export const error = function(error: any,  req: Request, res: Response, next: NextFunction){
    const statusCode  = error.statusCode || 500
    Logging.error(`Error: [${error.message}] - StatusCode: [${statusCode}]`)
    return res.status(statusCode).json({status: false, message: error.message});
}