module.exports = class ErrorResponse {
    status;
    message;

    constructor(status, message) {
        this.status = status;
        this.message = message;
    }

}