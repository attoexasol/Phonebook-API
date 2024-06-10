/**
 * Title: Admin Router
 * Description: Handle All Admin Related Routes Here
 * Author: Md Abdullah
 * Date: 11/06/2024
 */

const express = require('express');
const adminRouter = express.Router();


//Admin Auth:
adminRouter.post('/signin', handleAdminSignIn);
adminRouter.post('/signup', handleAdminSignUp);


//Admin CRUD:
adminRouter.get('/', handleGetPhoneNumber);
adminRouter.post('/', handleCreatePhoneNumber);
adminRouter.put('/', handleUpdatePhoneNumber);
adminRouter.delete('/', handleDeletePhoneNumber);
