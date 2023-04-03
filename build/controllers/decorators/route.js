"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.put = exports.del = exports.patch = exports.post = exports.get = void 0;
require("reflect-metadata");
const Methods_1 = require("./Methods");
const MetaDataKeys_1 = require("./MetaDataKeys");
function routeBinder(method) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata(MetaDataKeys_1.MetaDataKeys.path, path, target, key);
            Reflect.defineMetadata(MetaDataKeys_1.MetaDataKeys.method, method, target, key);
        };
    };
}
exports.get = routeBinder(Methods_1.Methods.get);
exports.post = routeBinder(Methods_1.Methods.post);
exports.patch = routeBinder(Methods_1.Methods.patch);
exports.del = routeBinder(Methods_1.Methods.del);
exports.put = routeBinder(Methods_1.Methods.put);
