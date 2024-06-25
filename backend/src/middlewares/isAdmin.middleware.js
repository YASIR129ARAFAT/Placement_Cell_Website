const { asyncHandler } = require("../utils/asyncHandler")

const isAdminMiddleware = asyncHandler(async(req,res,next)=>{
    const userType = req?.user?.userType

    if(userType === "admin"){
        next();
    }else{
        throw new Error("Unauthorised Access!!")
    }
})

module.exports = {isAdminMiddleware}