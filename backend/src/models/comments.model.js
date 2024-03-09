const mongoose = require('mongoose')

const {Schema} = mongoose

const CommentsSchema = new Schema(
    {
        commentorId:{type:mongoose.Schema.ObjectId, required:true}, // id of user who commented
        content:{type:String},
        announcementId:{type: mongoose.Schema.ObjectId , required:true}, // annnouncementId of which it is a comment
    },
    {
        timestamps:true,
        toJSON:{virtuals:true},
        toObject:{virtuals:true}
    }
)
CommentsSchema.virtual('formattedDate').get(function(){
    let date = this?.updatedAt;
    date = date.toLocaleDateString('en-GB',{day:'2-digit',month:'2-digit',year:'numeric'});

    return date
})

CommentsSchema.virtual('formattedTime').get(function(){
    let time = this?.updatedAt;
    time = time.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit', hour12:true})

    return time;
})

exports.Comment = mongoose.model("Comment",CommentsSchema)