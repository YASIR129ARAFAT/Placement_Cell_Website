exports.asyncHandler = (func)=>{
    return async function(req,res,next){
        try{
            await func(req,res,next);
        }
        catch(error){
            console.log(error);
            res.json({
                success:0,
                message: error.message
            })
        }
    }
}

