import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    task:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: false
    }
})

export const Todo = new mongoose.model('Todo', todoSchema);