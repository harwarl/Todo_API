import { AppRouter } from "../../AppRouter"
import 'reflect-metadata'
import { MetaDataKeys } from "./MetaDataKeys";
import { Methods } from "./Methods";

export function controller(routePrefix: string){
    return function(target: Function){
        const router = AppRouter.getInstance();
        for(let key of Object.getOwnPropertyNames(target.prototype)){
            const routeHandler = target.prototype[key];

            //get path and Method in metadata
            const path = Reflect.getMetadata(MetaDataKeys.path, target.prototype, key);
            const method: Methods = Reflect.getMetadata(MetaDataKeys.method, target.prototype, key);

            console.log(method);
            console.log(path);
            if(path){
                router[method](`${routePrefix}${path}`, routeHandler);
            }
        }
    }
}