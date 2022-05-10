const { API_ENDPOINT_NOT_FOUND_ERR, SERVER_ERR } = require("../errors");

module.exports = function (app) {
  app.use("*", (req, res, next) => {
    const error = {
      status: 404,
      message: API_ENDPOINT_NOT_FOUND_ERR,
    };
    next(error);
  });

  app.use((err, req, res, next) => {
    console.log(err);
    const status = err.status || 500;
    const message = err.message || SERVER_ERR;
    const data = err.data || null;
    res.status(status).json({
      type: "error",
      message,
      data,
    });
  });
};
