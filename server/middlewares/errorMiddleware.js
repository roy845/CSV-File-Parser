const multer = require("multer");

const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).send({ error: err.message });
  }
  next(err);
};

module.exports = { errorHandler };
