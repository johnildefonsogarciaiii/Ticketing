const AppError = require('./../utils/appError');


//Function that handles error in req.params (production)
const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
  };
  
//Function that handles error in posting (production)
  const handleDuplicateFieldsDB = err => {
    const value = err.message.match(/(["'])(\\?.)*?\1/);
    console.log(value);
  
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
  };

//Function that handles error in patching with wrong data validation (production)
  const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
  
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
  };
  
  //Function that handles wrong JWT
  const handleJWTError = () => {
    return new AppError('Invalid token, please login again.', 401)
  }

  //Function that handles expired error
  const handleJWTExpiredError = () =>{
    return new AppError('Your token has expired, please login again', 401)
  }

  //Function that sends error for Development phase
  const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  };
  
  //Function that sends error for Production phase
  const sendErrorProd = (err, res) => {
    // Operational error
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
  
      // Programming error
    } else {  
      res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!'
      });
    }
  };


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';


    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
      } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
    
        if (err.name === 'CastError') error = handleCastErrorDB(error);
        if (err.code === 11000) error = handleDuplicateFieldsDB(err);
        if (err._message === 'Validation failed') error = handleValidationErrorDB(err);
        if (err.name === 'JsonWebTokenError') error = handleJWTError()
        if (err.name === 'TokenExpiredError') error = handleJWTExpiredError()

    
        sendErrorProd(error, res);
      }
    };