/**
 * Title: User Router
 * Description: Handle All User Related Routes Here.
 * Author: Md Abdullah
 * Date: 11/06/2024
 */

const express = require('express');
const userRouter = express.Router();


userRouter.get('/', handleGetPhoneNumber);