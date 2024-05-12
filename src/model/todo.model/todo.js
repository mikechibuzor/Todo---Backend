
import { Model } from 'sequelize';
import { ModelNames } from '../../utils/constants.js';
import { v4 as uuidv4 } from 'uuid';
const { todo } = ModelNames;

const TodoModel = (sequelize, DataTypes) => {
  class Todo extends Model {
    associate() {}
  }

  Todo.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: () => uuidv4(),
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: todo,
      tableName: todo,
      timestamps: false,
    }
  );

  return Todo;
};
export default TodoModel;
