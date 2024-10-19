class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

const handleError = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Server Error';

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        message = `Resource not found with id of ${err.value}`;
        statusCode = 404;
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        message = 'Duplicate field value entered';
        statusCode = 400;
    }

    res.status(statusCode).json({
        success: false,
        message: message
    });
};

module.exports = {
    ErrorHandler,
    handleError
};
