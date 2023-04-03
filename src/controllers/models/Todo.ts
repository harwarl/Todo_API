import mongoose, { Schema, Document } from 'mongoose';

export interface ITodo extends Document{
    title: string;
    description: string;
    completed: boolean
    createdAt: Date;
    updatedAt: Date;
}

const todoSchema: Schema = new Schema<ITodo>({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdAt: { required: true, default: new Date(), type: Date },
    updatedAt: { required: true, default: new Date(), type: Date }
})

export const Todo = mongoose.model<ITodo>('Todo', todoSchema);