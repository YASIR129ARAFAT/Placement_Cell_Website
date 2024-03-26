const mongoose = require('mongoose')
const { Schema } = mongoose

// this will contain both results and all announcemets 

const AnnouncementSchema = new Schema(
    {
        announcer: { type: mongoose.Schema.ObjectId, required: true, ref:"User" },
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
AnnouncementSchema.virtual('formattedDate').get(function(){
    let date = this?.updatedAt;
    /**
     * for populating if virtual attribute is not selected then it will give an error
        because mongodb will try to add virtual object from some object which is not present in
        the result
     * to avoid this always add a conditional check in before creating a virtual object
     */
    if(!date) return null;

    date = date.toLocaleDateString('en-GB',{day:'numeric',month:"short",year:"numeric"})
    return date;
})

exports.Announcement = mongoose.model("Announcement",AnnouncementSchema)