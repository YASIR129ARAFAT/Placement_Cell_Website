const express = require('express');

const {
    createUser,
    login,
} = require('../controllers/auth.controller.js');



const router = express.Router();

router
    .post('/signup', createUser) // /auth/signup
    .post('/login', login)

    

exports.authRoute = router;