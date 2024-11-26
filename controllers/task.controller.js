import { Todo } from '../models/todo.models.js';

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        if (!todos.length) {
            return res.status(200).json({ message: "No tasks found" });
        }
        res.status(200).json(todos);
    } catch (error) {
        console.log("Error in getting todos: ", error);
        res.status(500).json({ message: "Some error occurred" });
    }
};

const addTodo = async (req, res) => {
    try {
        const { task, status = false } = req.body;

        // Validate the task
        if (!task || typeof task !== 'string' || task.trim() === '') {
            return res.status(400).json({ message: "Valid task is required" });
        }

        // Validate the status
        if (typeof status !== 'boolean') {
            return res.status(400).json({ message: "Status must be a boolean" });
        }

        const todo = new Todo({
            task,
            status
        });

        await todo.save();
        res.status(201).json({ message: "Todo added successfully" });
    } catch (error) {
        console.log("Error in adding todo: ", error);
        res.status(500).json({ message: "An error occurred while adding the todo" });
    }
};

const updateTodo = async(req,res) =>{
    try {
        
        // const {task,status} = req.body;
        const {id} = req.params;

        const todo = await Todo.findById(id);
        const status = !todo.status

        const updatedTask = await Todo.findByIdAndUpdate(
            id,
            {status},
            {new:true}
        )

        res.status(200).json(updatedTask)
    } catch (error) {
        console.log('Error updating todo:', error);
        res.status(500).json({message: 'An error occurred while updating the todo'});        
    }
}

const deleteTodo = async(req,res) =>{
    try {
        const {id} = req.params

        const response = await Todo.findByIdAndDelete(id)
        res.status(200).json({message: 'Todo deleted successfully'});
    } catch (error) {
        console.log('Error deleting todo:', error);   
        res.status(500).json({message: 'An error occurred while deleting the todo'});     
    }
}

export { getTodos, addTodo, updateTodo, deleteTodo };
