import mongoose from 'mongoose';
import { Logging } from '../utils/Logging';

type TInput = {
    db: string
}

export default ({db}: TInput) =>{
    const connect= () =>{
        mongoose.connect(db)
        .then(():void =>{
            Logging.info('Db Connected Successfully');
        })
        .catch((error):void=>{
            Logging.error('Error Connecting to DB');
            Logging.error(error);
        })
    }

    connect();
}