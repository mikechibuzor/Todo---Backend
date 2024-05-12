// utils
import { NewPaginateFunction } from "../utils/helpers.js";

// repository
import TodoRepository from '../repositories/todoRepository.js'

class TodoService {
  static async getAllTodos(req) {
    try {
      const {
        number = 1,
        size = 10,
        sort = {},
        status,
        search = {},
      } = req.query;

      const inputs = {
        sort,
        search,
        status,
        number,
        size,
      };

      const { todos, count } = await TodoRepository.getAllTodos(
        req.models,
        inputs
      );
      

      const paginatedResult = NewPaginateFunction(todos, number, size, count);

      return { todos, paginatedResult };
    } catch (error) {
      throw error;
    }
  }
  static async addTodo(req) {
    try {
      const payload = req.body;

      const result = await TodoRepository.addTodo(req.models, payload)
      return result

    } catch (error) {
      throw error;
    }
  }
}

export default TodoService