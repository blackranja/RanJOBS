const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('https-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.StatusCode).json({
            msg: err.message
        })
    }
    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send('Something Went Wrong Try Again Later')

}
module.exports = errorHandlerMiddleware;