

const { User } = require('../models/user.models');
const getHtml = require('../utils/Mails/RegistrationEmails/htmlEmailBody.js');
const sendRegistrationEmail = require('../utils/Mails/RegistrationEmails/registrationEmail.js');
const { asyncHandler } = require('../utils/asyncHandler.js');



exports.createUser = asyncHandler(async (req, res) => {

    // console.log(req.file);

    let formData = req.body
    // console.log("req.body");
    // console.log(req.body);
    formData.password = formData.dob; // initially password is set as dob YYYY-MM-DD

    // trim all values of the formData
    for (const [key, value] of Object.entries(formData)) {
        const newValue = value.trim().trimStart()
        formData[key] = newValue;
    }

    let flag = 0;
    let error = {}
    Object.entries(formData).forEach(([key, value]) => {
        if (value === "") {
            const newKey = key.toString() + "Error";
            error = { ...error, [newKey]: `${key} can't be empty` };
            flag++;
        }
    });

    const { password, name, email, enrolmentNo, mobile, gender,
        batch, branch, dob } = formData

    if (password.length < 4) {
        error = { ...error, confirmPasswordError: "Passwords must be of 4 or more characters" }
        flag++;
    }
    
    if (mobile.length != 10) {
        error = { ...error, mobileError: "Invalid mobile number" }
        flag++;
    }

    let checkUser = await User.findOne({ enrolmentNo });
    if (checkUser) {
        error = { ...error, enrolmentNoError: "Enrolment no already is use!!" }
        flag++;
    }

    checkUser = await User.findOne({ email });
    if (checkUser) {
        error = { ...error, emailError: "email already is use!!" }
        flag++;
    }


    if (flag > 0) {
        return res.json({ success: 0, error });
        // throw new apiError(error,"messae from me", 500)
    }


    const user = new User({
        email,
        name,
        enrolmentNo,
        gender,
        batch,
        branch,
        mobile,
        dob,
        password,
        dob
    });
    await user.save();

    // console.log("dob: ",dob);

    //send email for successfull registration
    const to = email
    const subject = `Registration for Placements Sucessful`
    const text = ``
    const html = getHtml(name,password,email)
    await sendRegistrationEmail(to,subject,text,html);

    //not safe to send password and token to user as response so remove them from object
    let { password: omit_pass, token, ...restObj } = formData
    // since password is already used as a name for var we used `password:omit_pass`
    // console.log("User Registered Successfully")
    // console.log(restObj)
    res.json({ user: restObj, success: 1, successMessage: "User Registered Successfully" });

})

const generateAccessAndRefreshToken = async (user_id) => {
    try {
        let user = await User.findById(user_id)

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.log(error);
        res.json({ success: 0, error: { message: "server unable to generate token" } });
    }

}
exports.login = asyncHandler(async (req, res) => {

    // console.log("req.body");
    // console.log(req.body);
    let { email, password } = req.body;

    //trim the values
    email = email.trim().trimStart().toLowerCase()
    password = password.trim().trimStart()

    if (email === "") {
        return res.json({ success: 0, error: { emailError: "email can't be empty" } });
    }
    if (password === "") {
        return res.json({ success: 0, error: { passwordError: "password can't be empty" } });
    }


    const user = await User.findOne({ email })
    if (user) {
        // console.log(user.password)
        const isMatch = await user.isPasswordCorrect(password);

        if (isMatch === true) {
            const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
            // console.log({accessToken,refreshToken})
            console.log("login successfull..");

            const option = {
                httpOnly: true,
                secure: true, // this ensures that only server can modify the cookies... but default anyone can modify it which is not good
                maxAge: 7 * 24 * 60 * 60 * 1000,
            }
            
            
            //prepare user data to be sent as response
            //user obtained from db may not be a json object so first we convert it into an object
            //By calling .toObject() on the user object, you convert it to a plain JavaScript object, excluding the Mongoose-specific metadata.
            const { password: omit_pass, refreshToken: omitRefreshToken, ...responseData } = user.toObject()
            responseData.token = accessToken;
            
            res
            .status(201)
            // .cookie(
            //     'accessToken',
            //     {
            //         _id: user._id,
            //             accessToken,
            //             email
            //         },
            //         option
            //     )
            //     .cookie(
            //         'refreshToken',
            //         {
            //             _id: user._id,
            //             refreshToken,
            //             email
            //         },
            //         option

            //     )
                .json({ success: 1, message: "login succesfull", error: {}, user: responseData });
        }
        else {
            res.json({ success: 0, error: { passwordError: "Wrong password" } });
        }
    }
    else {
        res.json({ success: 0, error: { emailError: "User does not exist" } });
        // res.send("<>hdbcd</>")
    }

})



