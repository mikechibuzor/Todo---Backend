
import { StatusCodes } from "./constants.js";
import Sequelize from 'sequelize';
import lodash from 'lodash';
const _ = lodash;
export const SendErrorResponse = (
  res,
  code = StatusCodes.BAD_REQUEST,
  message = '',
  data = []
) => {

  return res.status(code).send({
    code,
    status: 'failure',
    error: {
      id: res.request_id || '',
      publicMessage: FormatPublicMessage(message),
      message,
    },
    data,
  });
};

export const SendSuccessResponse = (
  res,
  code = StatusCodes.SUCCESS,
  message = '',
  data = []
) => {
  return res.status(code).send({
    code,
    request_id: res.request_id || '',
    status: 'success',
    message,
    data,
    access_token: res.access_token,
  });
};

export const FormatPublicMessage = (message) => {
  let length;

  if (!message) return;

  if (message.includes(':')) {
    length = message.split(':').length;
  }

  return length ? message.split(':')[1]?.trim() : message;
};
export const NewPaginateFunction = (results = [], page, limit, count) => {
  const hasNextPage = limit * page < count;
  const hasPreviousPage = page > 1;

  return {
    totalCounts: count,
    itemsPerPage: +limit,
    hasPreviousPage,
    hasNextPage,
    currentPage: +page,
    results,
  };
};
export const WhereClauseHelper = (queryObject, others = {}) => {
  let whereClause = {};

  for (const [queryKey, queryValue] of Object.entries(queryObject)) {
    const searchP = searchType(queryKey, queryValue);

    whereClause[queryKey] = searchP ?? undefined;
  }

  for (const [key, value] of Object.entries(others)) {
    if (value !== undefined) {
      whereClause[key] = value ?? undefined;
    }
  }

  whereClause = _.omitBy(
    {
      ...whereClause,
    },
    _.isUndefined
  );

  return whereClause;
};

export const OrderClauseHelper = (orderObject) => {
  let orderClause = [];

  for (const [queryKey, queryValue] of Object.entries(orderObject)) {
    if (queryKey && queryValue) {
      orderClause.push([queryKey, queryValue]);
    }
  }

  return orderClause;
};
export const IsNotColumnMember = (h) => {
  const b = ['column', 'does not exist'];

  let count = 0;

  for (let word of h.split(' ')) {
    if (b.includes(word)) {
      count++;
    }
  }

  return count >= 0;
};


export default function createSequelize(connectionString) {
  return new Sequelize(
    connectionString.database,
    connectionString.username,
    connectionString.password,
    {
      ...connectionString.dbConfig,
      logging: false,
    }
  );
}
export const PageOffset = (number, size) => {
  return (number - 1) * size;
};