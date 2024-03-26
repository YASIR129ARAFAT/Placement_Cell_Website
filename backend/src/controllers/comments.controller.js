const { asyncHandler } = require("../utils/asyncHandler");
const { Comment } = require('../models/comments.model.js');
const { User } = require("../models/user.models.js");




exports.getComments = asyncHandler(async (req, res) => {
    const commentorId = req.params?.commentorId //id of the of which it is a comment

    /*

     * we need a few virtual object but we are not using select to get those because
       we will convert the recieved result from query to either json or Object 
       and with correct options enabled in our model files it will automatically place those virtual objects there

     */
    let comments = await Comment
                    .find({ announcementId: commentorId })
                    // .populate("commentorId", "name email")
                    .exec()
    console.log(typeof comments);
    // comments = comments.toObject()
    let newCommentsArr=[]
    for(let obj of comments){
        obj = obj.toObject()
        const userData = await User
                        .findById(obj?.commentorId)
                        .select("-refreshToken -password")

        const newObj = {...obj,name:userData?.name,image:userData?.image,isAdmin:userData?.isAdmin}

        newCommentsArr.push(newObj)
    }
    console.log(newCommentsArr);
    
    res.json(newCommentsArr); // converted to json and sent

})
exports.addComment = asyncHandler(async (req, res) => {
    const { content, announcementId } = req.body;
    // console.log("req.body from comment");
    // console.log(req.body);
    const userData = req.user;

    const comment = new Comment({
        commentorId: userData._id, // id of user making comment
        content, // content of comment
        announcementId // id of announcement of which it is a comment
    })

    await comment.save();
    const data = comment.toObject();
    res.status(201).json({
        success: 1,
        message: "comment added sucessfully",
        data,
    })
})