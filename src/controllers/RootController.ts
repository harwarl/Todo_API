import { get, controller } from './decorators';
import { Request, Response, NextFunction } from 'express';

@controller('')
class RootController{
    @get('/')
    getRoot(req: Request, res: Response, next: NextFunction){
        res.status(200).json({status: true, message:'Welcome to my Todo API'})
    }

    @get('*')
    getUnKnown(req: Request, res: Response, next: NextFunction){
        res.status(200).json({status: false, message:'You missed your way'})
    }
}