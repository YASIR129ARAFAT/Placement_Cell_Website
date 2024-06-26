const express = require('express');

const {
    createUser,
    login,
    resetForgotPassword,
    resetFinalForgotPassword,
} = require('../controllers/auth.controller.js');
const { authMiddleware } = require('../middlewares/auth.middleware.js');
const { isAdminMiddleware } = require('../middlewares/isAdmin.middleware.js');


const router = express.Router();

router
    .post('/signup',
        authMiddleware,
        isAdminMiddleware,
        createUser
    ) // /auth/signup
    .post('/login', login)
    .post('/reset/:id/:token', resetFinalForgotPassword)
    .post('/resetPassword', resetForgotPassword) // this is reset for forgot password case


exports.authRoute = router;