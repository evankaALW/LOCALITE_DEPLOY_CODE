// error-handler.js
//middleware to handle the try-catch errors and errors related to Internal Server Error
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
};

module.exports = errorHandler;
