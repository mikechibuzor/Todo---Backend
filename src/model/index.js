import todoModel from './todo.model/index.js';

function model() {
  const { todoSequelize, Todo } = todoModel();

  const models = {
    todoSequelize,
    Todo,
  };

  const sequelizeInstances = [todoSequelize];

  return {
    sequelizeInstances,
    models,
  };
}

export default model;
