import { Router } from 'express';
import TodoRouter from './todo.route.js'

const router = Router();
const baseTodoRoute = '/api/v1/todo'

router.use(baseTodoRoute, TodoRouter)


export default router;