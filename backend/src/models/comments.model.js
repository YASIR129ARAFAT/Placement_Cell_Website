const mongoose = require('mongoose')


const { Schema } = mongoose

const CommentsSchema = new Schema(
    {
        commentorId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref:'User'
        }, // id of user who commented
        content: { type: String },
        announcementId: { type: mongoose.Schema.ObjectId, required: true }, // annnouncementId of which it is a comment
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)
CommentsSchema.virtual('formattedDate').get(function () {
    let date = this?.updatedAt;
    date = date.toLocaleDateString('en-GB', { day: 'numeric', month: "short", year: "numeric" })

    return date
})

CommentsSchema.virtual('formattedTime').get(function () {
    let time = this?.updatedAt;
    /**
     * for populating if virtual attribute is not selected then it will give an error
        because mongodb will try to add virtual object from some object which is not present in
        the result
     * to avoid this always add a conditional check in before creating a virtual object
     */
    if(!time) return null;
    
    time = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })

    return time;
})

exports.Comment = mongoose.model("Comment", CommentsSchema)