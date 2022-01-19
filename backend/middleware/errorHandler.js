const ErrorHandler = require('../utils/errorHandler');

module.exports = (err,req,res,next) =>{

    res.status(err.statusCode).json({
        success:false,
        errorMessage: err.message || 'Internal Server Error',
        statusCode: err.statusCode || 500
    });
};