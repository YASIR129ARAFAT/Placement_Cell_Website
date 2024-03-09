const express = require('express');
const { 
    getAllUser,
    getUser,
    replaceUser,
    updateUser,
    deleteUser,
    logout, 
    changePassword,
    getLoggedInUserDetails} = require('../controllers/user.controller.js')


const router = express.Router();

//READ -> GET   /user
//READ -> GET   /user/:id
// CREATE -> POST
// update - put
//Delete -> DELETE


// Note: The order of route definitions in Express matters. Placing the 'getLoggedInUserDetails' route
// at the top ensures that it gets matched before routes with dynamic parameters like '/:getAdminsOnly' and '/:id'.
// This order prevents unintentional matching of more generic routes and resolves the issue of fetching
// details of the logged-in user correctly.

// /api/user/loggedInUserDetails
// route to get details od logged in user
router.get('/loggedInUserDetails',getLoggedInUserDetails);

// ---

/*
 * /api/user 
*/ 
router
.get('/otherUserProfile/:id', getUser)
.get('/:getAdminsOnly', getAllUser)
.patch('/updateUserDetails/:id', updateUser)
.delete('/:id', deleteUser)
.post('/logout',logout) //auth middleware
.post('/changePassword',changePassword)



exports.userRoute = router;

