import 'reflect-metadata';
import { Methods } from './Methods';
import { MetaDataKeys } from './MetaDataKeys';

function routeBinder(method: string){
    return function(path: string){
        return function(target: any, key: string){
            Reflect.defineMetadata(MetaDataKeys.path, path, target, key);
            Reflect.defineMetadata(MetaDataKeys.method, method, target, key);
        }
    }
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const patch = routeBinder(Methods.patch);
export const del = routeBinder(Methods.del);
export const put = routeBinder(Methods.put);