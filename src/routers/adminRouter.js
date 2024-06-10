/**
 * Title: Admin Router
 * Description: Handle All Admin Related Routes Here
 * Author: Md Abdullah
 * Date: 11/06/2024
 */

const express = require('express');
const { handleAdminSignIn, handleAdminSignUp, handleCreatePhoneNumber, handleUpdatePhoneNumber, handleDeletePhoneNumber } = require('../controllers/adminController');
const { handleGetPhoneNumber } = require('../controllers/userController');
const adminRouter = express.Router();


//Admin Auth:
adminRouter.post('/signin', handleAdminSignIn);
adminRouter.post('/signup', handleAdminSignUp);


//Admin CRUD:
adminRouter.get('/', handleGetPhoneNumber);
adminRouter.post('/', handleCreatePhoneNumber);
adminRouter.put('/', handleUpdatePhoneNumber);
adminRouter.delete('/', handleDeletePhoneNumber);


module.exports = adminRouter;
