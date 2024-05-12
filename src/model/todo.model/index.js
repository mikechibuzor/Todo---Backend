import Sequelize from 'sequelize';
import { sequelizeInstance } from '../../connections/index.sequelize.js';
import TodoModel from './todo.js';

function Todo() {
  const todoDB = {};

  const sequelize = sequelizeInstance();
  const todo = TodoModel(sequelize, Sequelize.DataTypes);

  todoDB.Todo = todo;

  todoDB.todoSequelize = sequelize;
  todoDB.TodoSequelize = Sequelize;

  return todoDB;
}

export default Todo;
