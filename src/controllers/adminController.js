const { Category } = require("../models/contactSchema");
const { errorResponse, successResponse } = require("./responseController");

const handleAdminSignIn = async (req, res, next) => {
    // Implement signIn logic
};

const handleAdminSignUp = async (req, res, next) => {
    // Implement signUp logic
};

const handleGetPhoneNumber = async (req, res, next) => {
    // Implement getPhoneNumber logic
};

const handleCreatePhoneNumber = async (req, res, next) => {
    try {
        const {firstName, lastName, phoneNumbers, emailAddresses, addresses, birthdate, profile, category} = req.body;

        if(!firstName || !lastName || !phoneNumbers || !emailAddresses || !addresses || !birthdate || !profile || !category){
            return errorResponse(res, { statusCode: 400, message: "Please provide a all the required information to create a phoneNumber." });
        }

        const isCategoryAvailable = await Category.findById(category);

        if(!isCategoryAvailable){
            return errorResponse(res, { statusCode: 400, message: "The Category you selected is not available." });
        }

        const createdPhoneBook = await Category.create({firstName, lastName, phoneNumbers, emailAddresses, addresses, birthdate, profile, category});

        return successResponse(res, { statusCode: 201, message: "PhoneBook has been created successfully.", payload: createdPhoneBook });
    } catch (error) {
        console.error(error);
        errorResponse(res, { message: "Internal server error" });
    }
};

const handleCreateCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            return errorResponse(res, { statusCode: 400, message: "Please provide a name for the category." });
        }
        const category = await Category.create({ name });

        return successResponse(res, { statusCode: 201, message: "Category has been created successfully.", payload: category });
    } catch (error) {
        console.error(error);
        return errorResponse(res, { message: "Internal server error" });
    }
};


const handleUpdatePhoneNumber = async (req, res, next) => {
    // Implement updatePhoneNumber logic
};

const handleDeletePhoneNumber = async (req, res, next) => {
    // Implement deletePhoneNumber logic
};

module.exports = {
    handleAdminSignIn,
    handleAdminSignUp,
    handleGetPhoneNumber,
    handleCreatePhoneNumber,
    handleUpdatePhoneNumber,
    handleDeletePhoneNumber,
    handleCreateCategory,
};
