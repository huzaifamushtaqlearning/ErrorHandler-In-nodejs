class ApiError extends Error {
    constructor(
        statusCode=500,
        message= "Something went wrong",
        errors = [],
        data = null,
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = data
        this._message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}