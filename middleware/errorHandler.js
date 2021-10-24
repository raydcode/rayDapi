const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {

  let error = {...err}

  error.message = err.message

  // Log Console to Dev
  console.log(err.stack.red);
  

  //Mongoose Bad Object ID
   if(err.name === 'CastError') {
      const message = `Project not Found with id ${err.value}`
      error = new ErrorResponse(message,404)
   }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server Error' });
};

module.exports = errorHandler;
