import { NextFunction, Request, Response } from "express";
import { get, post, put, del, controller, patch } from './decorators'; 
import { Todo, ITodo} from "./models/Todo";
import mongoose from "mongoose";


interface ErrorWithStatusCode extends Error{
    statusCode? : number
}

@controller('/todos')
class TodoController{
    // Get all Todos
    @get('/')
    async getTodos(req: Request, res: Response, next: NextFunction){
        try{
            const todos = await Todo.find();
            res.send(todos)
        }catch(err: any){
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        }
    }

    //Add to the List
    @post('/')
    async postTodo(req: Request, res: Response, next: NextFunction){
        const { title, description } = req.body;
        try{
            const todo_exists = await Todo.find({title: title});
            console.log(todo_exists)
            if(todo_exists.length <= 0){
                const todo = new Todo({
                    _todoId: new mongoose.Types.ObjectId(),
                    title: title,
                    description: description
                })
                const saved_todo = await todo.save()
                return res.status(201).json({status: true, message: todo})
            }
            const err: ErrorWithStatusCode = new Error('Invalid Id');
            err.statusCode = 400;
            throw err;
            // return res.status(400).json({status: false, message: "Similar names"});
        }catch(err: any){
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        }
    }

    //Get a single task on the TodoList
    @get('/:todoId')
    async getTodo(req: Request, res: Response, next: NextFunction){
        const { todoId } = req.params;
        try{
            const todo = await Todo.findById(todoId);
            if(!todo){
                const err: ErrorWithStatusCode = new Error('Invalid Id');
                err.statusCode = 404;
                throw err;
                // return res.status(404).json({status: true, message: 'Invalid Id'});
            }
            return res.status(200).json({status: true, message: todo})
        }catch(err: any){
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        }
    }

    //Update a Task on the Todo List
    @patch('/:todoId')
    async patchTodo(req: Request, res: Response, next: NextFunction){
        const { todoId } = req.params;
        const { title, description } = req.body;
        try{
            const todo = await Todo.findById(todoId);
            if(!todo){
                const err: ErrorWithStatusCode = new Error('Invalid Id');
                err.statusCode = 404;
                throw err;
                // return res.status(404).json({status: true, message: 'Invalid Id'});
            }
            const todo_updated = await Todo.findOneAndUpdate({_id: todoId}, {
                    title: title,
                    description: description,
                    updatedAt: new Date()
            }, { new: true} )

            return res.status(200).json({status: true, message: "Document updated", data: todo_updated})
        }catch(err: any){
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        }
    }

    //Delete a task from the Todo List
    @del('/:todoId')
    async delTodo(req: Request, res: Response, next: NextFunction){
        const { todoId } = req.params;
        try{
            const todo = await Todo.findById(todoId);
            if(!todo){
                const err: ErrorWithStatusCode = new Error('Invalid Id');
                err.statusCode = 404;
                throw err;
                // return res.status(404).json({status: true, message: 'Invalid Id'});
            }
            await Todo.findOneAndDelete({_id: todoId});
            return res.status(200).json({status: true, message: 'Document Removed'})
        }catch(err: any){
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        }
    }

    @post('/:todoId/completed')
    async postComplete(req: Request, res: Response, next: NextFunction){
        const { todoId } = req.params;
        try{
            const todo = await Todo.findById(todoId);
            if(!todo){
                const err: ErrorWithStatusCode = new Error('Invalid Id');
                err.statusCode = 404;
                throw err;
                // return res.status(404).json({status: true, message: 'Invalid Id'});
            }
            const completed_todo = await Todo.findOneAndUpdate({_id: todoId}, {
                completed: true,
            }, {new: true});

            return res.status(200).json({status: true, message: 'Task Completed', data: completed_todo})
        }catch(err: any){
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        }

    }
}