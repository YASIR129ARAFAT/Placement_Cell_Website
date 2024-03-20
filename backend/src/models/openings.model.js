const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OpeningSchema = new Schema({
    announcer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User', // Reference to the User model assuming User is another model in your application
        required: true,
    },
    companyName: { type: String, required: true },
    offerType: {
        type: String,
        enum: ["Internship", "Full-time", "Internship + Full-time"],
        required: true
    },
    internship: {
        duration: Number, // in months
        stipendPerMonth: Number,
    },
    fullTime: { 
        ctc: Number, // in lpa
    },
    cgpaCriteria: [{
        branch: {
            type: String,
            required: true
        },
        cgpa: {
            type: Number,
            required: true
        }
    }],
    location: { type: String, required: true },
    formLink:{type:String, required:true},
    branchesAllowed: {
        type: [String],
        validate: {
            validator: function (v) {
                return v.length >= 1;
            },
            message: props => `${props.value} is not a valid value for branchesAllowed. branchesAllowed should have at least one element.`
        }
    },
    testDateAndTime: { type: Date, default: null },
    applicationDeadline: { type: Date, required: true },
    additionalInfo: { type: String, default:"" }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

//arrow function cant be used below because it does not have the access to 'this' pointer 
OpeningSchema.virtual('formattedApplicationDeadlineDate').get(function () {
    let date = this?.applicationDeadline;
    if (date) {
        date = date.toLocaleDateString('en-GB',{day:'numeric',month:"short",year:"numeric"})
        return date;
    }
    else {
        return null;
    }
})
OpeningSchema.virtual('formattedApplicationDeadlineTime').get(function () {
    let time = this?.applicationDeadline;
    if (time) {
        time = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
        return time;
    }
    else {
        return null;
    }
})
// virtual attributes for testDateAndTime
OpeningSchema.virtual("formattedTestDate").get(function () {
    let date = this?.testDateAndTime;
    if (date) {
        date = date.toLocaleDateString('en-GB',{day:'numeric',month:"short",year:"numeric"})
        return date;
    }
    else {
        return null;
    }

})
OpeningSchema.virtual("formattedTestTime").get(function () {
    let time = this?.testDateAndTime;
    if (time) {
        time = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
        return time;
    }
    else {
        return null;
    }
})

OpeningSchema.virtual("formattedUpdateDate").get(function(){
    let date = this?.updatedAt
    if(date){
        date = date.toLocaleDateString('en-GB',{day:'numeric',month:"short",year:"numeric"})
        return date;
    }else{
        return null;
    }
})
OpeningSchema.virtual("formattedUpdateTime").get(function(){
    let time = this?.updatedAt
    if(time){
        time = time.toLocaleTimeString([],{hour:'2-digit',minute:"2-digit",hour12:true})
        return time;
    }else{
        return null;
    }
})

const Opening = mongoose.model('Opening', OpeningSchema);

module.exports = Opening;