const { asyncHandler } = require("../utils/asyncHandler");
const { Comment } = require('../models/comments.model.js')




exports.getComments = asyncHandler(async (req, res) => {
    const commentorId = req.params?.commentorId //id of the of which it is a comment
  
    /*

     * we need a few virtual object but we are not using select to get those because
       we will convert the recieved result from query to either json or Object 
       and with correct options enabled in our model files it will automatically place those virtual objects there

     */
    const comments = await Comment.find({ announcementId: commentorId })

    res.json(comments); // converted to json and sent

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
    const data =  comment.toObject();
    res.status(201).json({
        success: 1,
        message: "comment added sucessfully",
        data,
    })
})