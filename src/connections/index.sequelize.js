import createSequelize from '../utils/helpers.js';

export const sequelizeInstance = () => {
  // const { username, password, dialect, host, port, database } = config[environment];

  const dbConfig = {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
  };

  const connString = {
    database: 'todo',
    dbConfig,
  };

  return createSequelize(connString);
};
