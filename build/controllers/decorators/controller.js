"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const AppRouter_1 = require("../../AppRouter");
require("reflect-metadata");
const MetaDataKeys_1 = require("./MetaDataKeys");
function controller(routePrefix) {
    return function (target) {
        const router = AppRouter_1.AppRouter.getInstance();
        for (let key of Object.getOwnPropertyNames(target.prototype)) {
            const routeHandler = target.prototype[key];
            //get path and Method in metadata
            const path = Reflect.getMetadata(MetaDataKeys_1.MetaDataKeys.path, target.prototype, key);
            const method = Reflect.getMetadata(MetaDataKeys_1.MetaDataKeys.method, target.prototype, key);
            console.log(method);
            console.log(path);
            if (path) {
                router[method](`${routePrefix}${path}`, routeHandler);
            }
        }
    };
}
exports.controller = controller;
