/**
 * Title: Admin Router
 * Description: Handle All Admin Related Routes Here
 * Author: Md Abdullah
 * Date: 11/06/2024
 */

const express = require('express');
const { handleAdminSignIn, handleAdminSignUp, handleCreatePhoneNumber, handleUpdatePhoneNumber, handleDeletePhoneNumber, handleCreateCategory, handleGetCategory } = require('../controllers/adminController');
const { handleGetPhoneNumber } = require('../controllers/userController');
const adminRouter = express.Router();


//Admin Auth:
adminRouter.post('/signin', handleAdminSignIn);
adminRouter.post('/signup', handleAdminSignUp);


//Admin CRUD PhoneNumber:
adminRouter.get('/contact', handleGetPhoneNumber);
adminRouter.post('/contact', handleCreatePhoneNumber);
adminRouter.put('/contact', handleUpdatePhoneNumber);
adminRouter.delete('/contact', handleDeletePhoneNumber);

//Admin CRUD Category:
adminRouter.post('/category', handleCreateCategory);
adminRouter.get('/category', handleGetCategory);


module.exports = adminRouter;
