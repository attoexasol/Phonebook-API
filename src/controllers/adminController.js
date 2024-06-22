const Admin = require("../models/adminSchema");
const bcrypt = require("bcryptjs");
const { Category, Contact } = require("../models/contactSchema");
const { errorResponse, successResponse } = require("./responseController");

const handleAdminSignIn = async (req, res, next) => {
    // Implement signIn logic
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return errorResponse(res, { statusCode: 400, message: "Please provide all the required information." });
        }

        const admin = await Admin.findOne({ email: email });
        if (!admin) {
            return errorResponse(res, { statusCode: 404, message: "Admin with this credential does not exist." });
        }

        const isMatched = bcrypt.compareSync(password, admin.password);
        if (!isMatched) {
            return errorResponse(res, { statusCode: 400, message: "Invalid Credentials." });
        }

        return successResponse(res, { statusCode: 200, message: "Admin logged in successfully." });
    } catch (error) {
        console.error(error);
        return errorResponse(res, { message: "Internal server error" });
    }
};


const handleAdminSignUp = async (req, res, next) => {
    // Implement signUp logic
    try {
        const {firstName, lastName, email, password} = req.body;

        if(!firstName || !lastName || !email || !password){
            return errorResponse(res, { statusCode: 400, message: "Please fill all the required fields." });
        }

        const adminCredintials = {firstName, lastName, email};
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        adminCredintials.password = hashedPassword
        await Admin.create(adminCredintials);

        return successResponse(res, { statusCode: 201, message: "New Admin Created successfully."}); 
    } catch (error) {
        console.error(error);
        return errorResponse(res, { message: "Internal server error" });
    }
};

const handleGetPhoneNumber = async (req, res, next) => {
    // Implement getPhoneNumber logic
    try {
        const allContact = await Contact.find({});

        return successResponse(res, { statusCode: 200, message: "Contact fetched successfully.", payload: allContact }); 
    } catch (error) {
        console.error(error);
        return errorResponse(res, { message: "Internal server error" });
    }
};
const handleCreatePhoneNumber = async (req, res, next) => {
    try {
        const { firstName, lastName, phoneNumbers, emailAddresses, addresses, birthdate, profile, category } = req.body;

        // Basic validation for required fields
        if (!firstName || !lastName || !phoneNumbers || !emailAddresses || !addresses || !birthdate || !category) {
            return errorResponse(res, { statusCode: 400, message: "Please provide all the required information to create a phone number." });
        }

        // Check if the specified category exists
        const isCategoryAvailable = await Category.findById(category);
        if (!isCategoryAvailable) {
            return errorResponse(res, { statusCode: 400, message: "The category you selected is not available." });
        }

        // Prepare the contact object
        const contactObj = {
            firstName,
            lastName,
            phoneNumbers,
            emailAddresses,
            addresses,
            birthdate,
            category
        };

        // Optionally add profile if provided
        if (profile) {
            contactObj.profile = profile;
        }

        // Create the contact entry
        const createdPhoneBook = await Contact.create(contactObj);

        // Respond with success message and created object
        return successResponse(res, { statusCode: 201, message: "Phone book entry has been created successfully.", payload: createdPhoneBook });

    } catch (error) {
        console.error("Error in handleCreatePhoneNumber:", error);
        // Handle any internal server error
        return errorResponse(res, { message: "Internal server error" });
    }
};



const handleUpdatePhoneNumber = async (req, res, next) => {
    try {
        // Implement updatePhoneNumber logic
        const {id, firstName, lastName, phoneNumbers, emailAddresses, addresses, birthdate, profile, category} = req.body;

        const isExist = await Contact.findById(id);

        if(!isExist){
            return errorResponse(res, { statusCode: 400, message: "The Contact you selected is not available." });
        }

        isExist.firstName = firstName || isExist.firstName;
        isExist.lastName = lastName || isExist.lastName;
        isExist.phoneNumbers = phoneNumbers || isExist.phoneNumbers;
        isExist.emailAddresses = emailAddresses || isExist.emailAddresses;
        isExist.addresses = addresses|| isExist.addresses;
        isExist.birthdate = birthdate|| isExist.birthdate;
        isExist.profile = profile|| isExist.profile;
        isExist.category = category|| isExist.category;

        const updatedContact = await Contact.findByIdAndUpdate(id, isExist, {new: true});

        return successResponse(res, { statusCode: 201, message: "Contact has been updated successfully.", payload: updatedContact }); 
    } catch (error) {
        console.error(error);
        return errorResponse(res, { message: "Internal server error" });
    }
};

const handleDeletePhoneNumber = async (req, res, next) => {
    // Implement deletePhoneNumber logic
    try {
        const {id} = req.body;
        await Contact.findByIdAndDelete(id);

        return successResponse(res, { statusCode: 202, message: "Contact has been deleted successfully."}); 
    } catch (error) {
        console.error(error);
        return errorResponse(res, { message: "Internal server error" });
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


const handleGetCategory = async (req, res, next) => {
    try {
        const allCategories = await Category.find({});

        return successResponse(res, { statusCode: 200, message: "Categories fetched successfully.", payload: allCategories });
    } catch (error) {
        console.error(error);
        return errorResponse(res, { message: "Internal server error" });
    }
};

module.exports = {
    handleAdminSignIn,
    handleAdminSignUp,
    handleGetPhoneNumber,
    handleCreatePhoneNumber,
    handleUpdatePhoneNumber,
    handleDeletePhoneNumber,
    handleCreateCategory,
    handleGetCategory,
};
