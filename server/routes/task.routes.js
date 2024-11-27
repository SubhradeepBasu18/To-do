import { Router } from "express";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controllers/task.controller.js";

const router = Router();

router.get('/', getTodos);
router.post('/addTodo', addTodo);
router.put('/updateTodo/:id', updateTodo);
router.delete('/deleteTodo/:id', deleteTodo);

export default router;