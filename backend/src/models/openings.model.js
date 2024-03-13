const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const openingSchema = new Schema({
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
        duration: String,
        stipendPerMonth: Number,
    },
    fullTime: {
        ctc: Number,
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
    location: { type: String, default:"Not Specified"},
    branchesAllowed: {
        type: [String],
        validate: {
            validator: function (v) {
                return v.length >= 1;
            },
            message: props => `${props.value} is not a valid value for branchesAllowed. branchesAllowed should have at least one element.`
        }
    },
    applicationDeadline: {type:Date,required:true},
    additionalInfo: { type: String, required: true }
}, {
    timestamps: true,
});

const Opening = mongoose.model('Opening', openingSchema);

module.exports = Opening;