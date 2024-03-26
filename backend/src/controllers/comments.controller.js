const { asyncHandler } = require("../utils/asyncHandler");
const { Comment } = require('../models/comments.model.js');
const { User } = require("../models/user.models.js");




exports.getComments = asyncHandler(async (req, res) => {
    const commentorsId = req.params?.commentorId //id of the of which it is a comment

    /*

     * we need a few virtual object but we are not using select to get those because
       we will convert the recieved result from query to either json or Object 
       and with correct options enabled in our model files it will automatically place those virtual objects there

     */
    let comments = await Comment
        .find({ announcementId: commentorsId })
        .populate("commentorId",
            "name email userType isAdmin image",
        )
        .exec()

    let newCommentsArr=[]
    for(let obj of comments){
        obj = obj.toObject()
        let newObj = obj;
        const {commentorId:writer,...rest} = newObj;
        newObj = {...rest,writer};
        newCommentsArr.push(newObj)
    }
    // console.log(newCommentsArr);

    res.json(newCommentsArr); // converted to json and sent
    // res.json(comments); // converted to json and sent

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

    let data = await comment.populate("commentorId","name email isAdmin image userType");
    data = data.toObject();

    const {commentorId:writer, ...rest} = data;
    data = {writer, ...rest}
    console.log("sjhsddj",data);

    res.status(201).json({
        success: 1,
        message: "comment added sucessfully",
        data,
    })
})

exports.deleteComment = asyncHandler(async (req,res)=>{
    const {_id} = req.params;
    // console.log(_id);
    
    const comment = await Comment.findByIdAndDelete(_id);

    res.json({success:1, message:"deleted sucessfully!!!"})
})