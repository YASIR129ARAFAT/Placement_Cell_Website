const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const constants = require('../constants.js');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema(
    {
        name: { type: String, required: [true, 'Name is mandatory'], trim: true, index: true },
        email: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(v);
                },
                message: props => `${props.value} is not a valid email address!`
            },
            required: [true, 'User email is required'],
            unique: [true, 'Email already used'],
            trim: true,
            index: true, // makes the search on the basis of email (this property) optimised
            lowercase: true
        },
        branch: { type: String, required: true, trim: true },
        mobile: { type: String, required: true, trim: true },
        batch: { type: String, required: true, trim: true },
        gender: { type: String, required: true, trim: true },
        dob: { type: Date, required: [true, 'DOB value is mandatory'] },
        enrolmentNo: {
            type: String,
            required: [true, 'enrolmentNo is mandatory'],
            unique: true,
            trim: true,
            index: true, // makes the search on the basis of email (this property) optimised
        },
        password: {
            type: String,
            required: [true, 'password value is mandatory'],
            trim: true
        },
        userType:{
            type:String,
            default:'student'
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        verifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            // ref: "Admin",  admin table yet to be created
            default: null
        },
        image: {
            type: String,
            default: ""
        },
        refreshToken: {
            type: String
        }
    },
    {
        toJSON:{virtuals:true},
        toObject:{virtuals:true},
        timestamps: true, // this will automatically create two more entries in user table named as "createdAt" and "updatedAt"
       
    }
)

// .pre is a middleware that runs a given function just before the specified event
UserSchema.pre("save", async function (next) { // the arrow function will not work here because it does not have "this" (current context) in its params
    if (this?.isModified("password") === true) { // isModified is a built in function that keeps track of modified fields.
        this.password = await bcrypt.hash(this.password, constants.bcrypt_salt_rounds);
    }
    next();

})
UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}
UserSchema.methods.isPasswordValid = async function () {
    return true;
}

UserSchema.methods.generateAccessToken = async function () {
    return await jwt.sign(
        {
            _id: this._id,
            email: this.email,
            enrolmentNo: this.enrolmentNo

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}
UserSchema.methods.generateRefreshToken = async function () {
    //refresh token are generally given less payload since they are stored in db
    return await jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
}

UserSchema.virtual('formattedDOB').get( function(){
    let dob =  this?.dob 
    // console.log("dob+",dob);

    dob = dob.toLocaleDateString('en-GB',{day:'2-digit',month:'2-digit',year:'numeric'})
    // console.log("dob+2",dob);

    return dob
})

exports.User = mongoose.model('User', UserSchema) // it will create a db as users automatically


