import { Todo } from '../models/todo.models.js';
import crypto from 'crypto';
import mongoose from 'mongoose';

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        
        const maskedTodos = todos.map(todo => ({
            id: crypto.createHash('sha256').update(todo._id.toString()).digest('hex').substr(0, 12),
            task: todo.task,
            status: todo.status
        }));

        res.status(200).json(maskedTodos);
    } catch (error) {
        console.error("Error in getting todos: ", error);
        res.status(500).json({ message: "Some error occurred" });
    }
};

const addTodo = async (req, res) => {
    try {
        const { task, status = false } = req.body;

        const todo = new Todo({
            task,
            status
        });

        await todo.save();

        const maskedId = crypto.createHash('sha256').update(todo._id.toString()).digest('hex').substr(0, 12);

        res.status(201).json({ 
            id: maskedId,
            task: todo.task,
            status: todo.status
        });
    } catch (error) {
        console.error("Error in adding todo: ", error);
        res.status(500).json({ message: "An error occurred while adding the todo" });
    }
};

const updateTodo = async(req, res) => {
    try {
        const { id } = req.params;
        console.log('Received update ID:', id);

        const todos = await Todo.find();
        const todo = todos.find(t => 
            crypto.createHash('sha256').update(t._id.toString()).digest('hex').substr(0, 12) === id
        );

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        todo.status = !todo.status;
        await todo.save();

        const maskedId = crypto.createHash('sha256').update(todo._id.toString()).digest('hex').substr(0, 12);

        res.status(200).json({ 
            id: maskedId,
            task: todo.task,
            status: todo.status
        });
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ message: 'An error occurred while updating the todo' });        
    }
};

const deleteTodo = async(req, res) => {
    try {
        const { id } = req.params;
        console.log('Received delete ID:', id);

        const todos = await Todo.find();
        const todoToDelete = todos.find(t => 
            crypto.createHash('sha256').update(t._id.toString()).digest('hex').substr(0, 12) === id
        );

        if (!todoToDelete) {
            return res.status(404).json({ message: "Todo not found" });
        }

        await Todo.findByIdAndDelete(todoToDelete._id);
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Error deleting todo:', error);   
        res.status(500).json({ message: 'An error occurred while deleting the todo' });     
    }
};

export { getTodos, addTodo, updateTodo, deleteTodo };