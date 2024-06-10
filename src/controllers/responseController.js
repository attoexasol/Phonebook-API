errorResponse = (res, statusCode = 504, message = "") => {
    return res.status(statusCode).json({
        success: false,
        message
    });
}


successResponse = (res, statusCode = 200, message = "", payload = {}) => {
    return res.status(statusCode).json({
        success: true,
        message,
        payload
    })
}


module.exports = {
    errorResponse,
    successResponse
}