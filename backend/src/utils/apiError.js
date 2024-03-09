class apiError extends Error {
    constructor(
        errors = {}, 
        message = "something went wrong", 
        statusCode = 500
    ) {

        super(message)
        this.message = message
        this.statusCode = statusCode
        this.data = null
        this.errors = errors
        this.success = false

        Error.captureStackTrace(this,this.constructor)
    }
}

exports.apiError =  apiError;