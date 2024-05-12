export const CORSOption = {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
export const StatusCodes = {
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  SUCCESS: 200,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};
export const ModelNames = {
  todo: 'todo'
}
export const TodoResponse = {
  NO_RECORD: 'No record exist for the moment',
  SUCCESS: 'Successfully retrieved all todos',
};