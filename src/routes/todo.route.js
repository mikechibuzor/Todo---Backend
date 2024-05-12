import { Router } from 'express';
import TodoController from '../controllers/todoController.js'

const todoRouter = Router();

todoRouter.route('/').get(TodoController.getTodos);
todoRouter.route('/add-todo').post(TodoController.addTodo);

export default todoRouter;
