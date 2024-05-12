// utils
import { SendErrorResponse, SendSuccessResponse } from '../utils/helpers.js';
import { StatusCodes, TodoResponse } from '../utils/constants.js';

// services
import TodoService from '../services/TodoService.js';

class TodoController {
  static async getTodos(req, res, next) {
    try {
      const { todos, paginatedResult } = await TodoService.getAllTodos(req);

      if (!todos.length)
        return SendSuccessResponse(
          res,
          StatusCodes.SUCCESS,
          TodoResponse.NO_RECORD
        );

      return SendSuccessResponse(
        res,
        StatusCodes.SUCCESS,
        TodoResponse.SUCCESS,
        paginatedResult
      );
    } catch (error) {
      return next(error);
    }
  }
  static async addTodo(req, res, next) {
    try {
      const result = await TodoService.addTodo(req);
      return SendSuccessResponse(
        res,
        StatusCodes.SUCCESS,
        TodoResponse.SUCCESS,
        result
      );
    } catch (error) {
      return next(error);
    }
  }
}

export default TodoController;
