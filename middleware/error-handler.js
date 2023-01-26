const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {

    let customError = {
        //set default
        statusCode: err.statusCode || Status.Coded.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later',

    }

    if (err instanceof CustomAPIError) {
        return res.status(err.StatusCode).json({
            msg: err.message
        })
    }

    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value enter for ${err.keyValue} field, please choose another value`
        customError.statusCode = 400
    }
    //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something Went Wrong Try Again Later')
    return res.status(customError.statusCode).json({ msg: customError.msg });
    
}
module.exports = errorHandlerMiddleware;