const CustomAPIError = require('./custom-error');
const { Statuscodes } = require('http-status-codes');

class BadRequest extends CustomAPIError {
    constructor(message) {
        super(message);
        this.Statuscode = Statuscodes.BAD_REQUEST
    }
}
module.exports = BadRequest;
