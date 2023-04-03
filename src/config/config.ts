import dotenv from 'dotenv';
dotenv.config();
import { env } from 'process';


interface Config {
    MONGO_URL?: string,
    PORT?: number
}

export const config: Config = {
    MONGO_URL: env.MONGO_URL,
    PORT: Number(env.PORT)
}