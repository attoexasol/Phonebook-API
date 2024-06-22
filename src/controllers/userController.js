const { Contact } = require("../models/contactSchema");
const { successResponse, errorResponse } = require("./responseController");


const handleGetPhoneNumber = async (req, res, next) => {
    try {
        const allContact = await Contact.find({});

        return successResponse(res, { statusCode: 200, message: "Contact fetched successfully.", payload: allContact }); 
    } catch (error) {
        console.error(error);
        return errorResponse(res, { message: "Internal server error" });
    }
}


module.exports = {
    handleGetPhoneNumber,
}