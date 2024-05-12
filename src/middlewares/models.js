function getModels(connection) {
  return function (req, res, next) {
    req.models = connection.getModels();
    next();
  };
}

export default getModels;
