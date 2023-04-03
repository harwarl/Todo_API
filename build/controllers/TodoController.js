"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("./decorators");
const Todo_1 = require("./models/Todo");
const mongoose_1 = __importDefault(require("mongoose"));
let TodoController = class TodoController {
    // Get all Todos
    getTodos(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todos = yield Todo_1.Todo.find();
                res.send(todos);
            }
            catch (err) {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            }
        });
    }
    //Add to the List
    postTodo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description } = req.body;
            try {
                const todo_exists = yield Todo_1.Todo.find({ title: title });
                console.log(todo_exists);
                if (todo_exists.length <= 0) {
                    const todo = new Todo_1.Todo({
                        _todoId: new mongoose_1.default.Types.ObjectId(),
                        title: title,
                        description: description
                    });
                    const saved_todo = yield todo.save();
                    return res.status(201).json({ status: true, message: todo });
                }
                const err = new Error('Invalid Id');
                err.statusCode = 400;
                throw err;
                // return res.status(400).json({status: false, message: "Similar names"});
            }
            catch (err) {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            }
        });
    }
    //Get a single task on the TodoList
    getTodo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { todoId } = req.params;
            try {
                const todo = yield Todo_1.Todo.findById(todoId);
                if (!todo) {
                    const err = new Error('Invalid Id');
                    err.statusCode = 404;
                    throw err;
                    // return res.status(404).json({status: true, message: 'Invalid Id'});
                }
                return res.status(200).json({ status: true, message: todo });
            }
            catch (err) {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            }
        });
    }
    //Update a Task on the Todo List
    patchTodo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { todoId } = req.params;
            const { title, description } = req.body;
            try {
                const todo = yield Todo_1.Todo.findById(todoId);
                if (!todo) {
                    const err = new Error('Invalid Id');
                    err.statusCode = 404;
                    throw err;
                    // return res.status(404).json({status: true, message: 'Invalid Id'});
                }
                const todo_updated = yield Todo_1.Todo.findOneAndUpdate({ _id: todoId }, {
                    title: title,
                    description: description,
                    updatedAt: new Date()
                }, { new: true });
                return res.status(200).json({ status: true, message: "Document updated", data: todo_updated });
            }
            catch (err) {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            }
        });
    }
    //Delete a task from the Todo List
    delTodo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { todoId } = req.params;
            try {
                const todo = yield Todo_1.Todo.findById(todoId);
                if (!todo) {
                    const err = new Error('Invalid Id');
                    err.statusCode = 404;
                    throw err;
                    // return res.status(404).json({status: true, message: 'Invalid Id'});
                }
                yield Todo_1.Todo.findOneAndDelete({ _id: todoId });
                return res.status(200).json({ status: true, message: 'Document Removed' });
            }
            catch (err) {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            }
        });
    }
    postComplete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { todoId } = req.params;
            try {
                const todo = yield Todo_1.Todo.findById(todoId);
                if (!todo) {
                    const err = new Error('Invalid Id');
                    err.statusCode = 404;
                    throw err;
                    // return res.status(404).json({status: true, message: 'Invalid Id'});
                }
                const completed_todo = yield Todo_1.Todo.findOneAndUpdate({ _id: todoId }, {
                    completed: true,
                }, { new: true });
                return res.status(200).json({ status: true, message: 'Task Completed', data: completed_todo });
            }
            catch (err) {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            }
        });
    }
};
__decorate([
    (0, decorators_1.get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "getTodos", null);
__decorate([
    (0, decorators_1.post)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "postTodo", null);
__decorate([
    (0, decorators_1.get)('/:todoId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "getTodo", null);
__decorate([
    (0, decorators_1.patch)('/:todoId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "patchTodo", null);
__decorate([
    (0, decorators_1.del)('/:todoId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "delTodo", null);
__decorate([
    (0, decorators_1.post)('/:todoId/completed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "postComplete", null);
TodoController = __decorate([
    (0, decorators_1.controller)('/todos')
], TodoController);
