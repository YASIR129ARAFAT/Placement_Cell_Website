const { asyncHandler } = require("../utils/asyncHandler")

const isAdminMiddleware = asyncHandler(async(req,res,next)=>{
    const isAdmin = req?.user?.isAdmin
    // console.log("hhhashajd");
    // console.log(typeof isAdmin);
    // console.log( isAdmin);
    if(isAdmin === true){
        next();
    }else{
        res.sendStatus(404)
    }
})

module.exports = {isAdminMiddleware}