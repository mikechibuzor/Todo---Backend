// utils
import {
  WhereClauseHelper,
  OrderClauseHelper,
  IsNotColumnMember,
  PageOffset,
} from '../utils/helpers.js';

class TodoRepository {
  static async getAllTodos(model, req) {
    try {
      let { sort, search, number, size } = req;

      const whereClause = WhereClauseHelper(search, {});
      const orderClause = OrderClauseHelper(sort);

      const todos = await model.Todo.findAll({
        where: {
          ...whereClause,
        },
        order: orderClause,
        raw: true,
        nest: true,
        offset: PageOffset(number, size),
        limit: size,
      });

      const count = await model.Todo.count({
        where: {
          ...whereClause,
        },
      });

      return { todos, count };
    } catch (error) {
      console.log(error);
      if (IsNotColumnMember(error.message)) {
        throw new Error('Invalid column search');
      } else {
        throw error;
      }
    }
  }
  static async addTodo(model, payload) {
    try {
      //  check if existing todo
      const todos = await model.Todo.findAll();
      const isExistingTodo = todos.find(
        (todo) => todo.description === payload.description
      );
      if (isExistingTodo) {
        throw new Error('Todo already exists');
      }
      // create todo
       const newTodo = await model.Todo.create(payload);

      return newTodo
    } catch (error) {
      console.log(error)
      if (IsNotColumnMember(error.message)) {
        throw new Error('Invalid column search');
      } else {
        throw error;
      }
    }
  }
}
export default TodoRepository;
