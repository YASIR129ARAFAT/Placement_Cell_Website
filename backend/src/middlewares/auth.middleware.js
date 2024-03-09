const jwt = require('jsonwebtoken')
const {User} = require('../models/user.models.js')
const { asyncHandler } = require('../utils/asyncHandler.js')
exports.authMiddleware = asyncHandler(async (req, res, next) => {
    //take out the token
    // it could be either in cookies or 
    //user could have sent it in the header
    const token =  req.header("token")
  
    
    // console.log("token");
    // console.log(token);

    if(!token){
        return res.sendStatus(401)
    }
    // console.log(token)
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log(decoded);

    const id = decoded?._id;
    // console.log(id);

    // take out the details of the user from the db
    const user = await User.findById(id).select("-password -refreshToken");
    
    if(!user){
        res.sendStatus(401); // unauthorised user
    }

    // place the obtained detail from db into the res object using any keyname (like user) 
    req.user = user;
    // console.log(req.user);
    // console.log(req.user,"from auth middle ware");
    next()
    

});