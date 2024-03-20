const mongoose = require('mongoose')
const { Schema } = mongoose

// this will contain both results and all announcemets 

const AnnouncementSchema = new Schema(
    {
        announcer: { type: mongoose.Schema.ObjectId, required: true },
        content: { type: String, required: true },
        isResults: { type: Boolean, default: 0 },
    },
    {
        timestamps: true,
        toJSON:{virtuals:true},
        toObject:{virtuals:true},
    }
)

//arrow function cant be used below because it does not have the access to 'this' pointer 
AnnouncementSchema.virtual('formattedTime').get(function(){
    let time = this?.updatedAt;
    time = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    return time;
})
AnnouncementSchema.virtual('formattedDate').get(function(){
    let date = this?.updatedAt;
    date = date.toLocaleDateString('en-GB',{day:'numeric',month:"short",year:"numeric"})
    return date;
})

exports.Announcement = mongoose.model("Announcement",AnnouncementSchema)