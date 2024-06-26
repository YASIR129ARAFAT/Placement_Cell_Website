
// const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
// let users = data.users;


const { User } = require('../models/user.models');
const { uploadOnCloudinary } = require('../utils/FileUploads/claudinary');
const { asyncHandler } = require('../utils/asyncHandler');

exports.getAllUser = asyncHandler(async (req, res) => {
    // console.log('hii');

    let getAdminsOnly = req.params?.getAdminsOnly
    getAdminsOnly = (getAdminsOnly === "false") ? (false) : (true);
    // console.log(getAdminsOnly);

    if (getAdminsOnly === true) {
        // console.log("hiii from boolean");
        const users = await User.find({ isAdmin: getAdminsOnly });

        res.json(users);
    }
    else {
        const users = await User.find();

        res.json(users);
    }



})
exports.getUser = asyncHandler(async (req, res) => {
    const _id = req.params?.id;

    const users = await User.findById(_id).select('-password -refreshToken')
        .populate("branch", "branchName branchCode")
        .exec()

    // console.log(users);

    res.json(users);

})

exports.replaceUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = req.body;
        const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
        res.json(user)
    } catch (error) {
        console.log(error)
        res.sendStatus(400);
    }
}
exports.updateUser = asyncHandler(async (req, res) => {

    const id = req.params?.id;
    let updatedValues = req.body;

    // console.log(id);


    // trim all values of the formData
    for (const [key, value] of Object.entries(updatedValues)) {

        const newValue = value.trim().trimStart()
        updatedValues[key] = newValue;

    }

    let flag = 0;
    let error = {}
    Object.entries(updatedValues).forEach(([key, value]) => {
        if (value === "") {
            const newKey = key.toString() + "Error";
            error = { ...error, [newKey]: `${key} can't be empty` };
            flag++;
        }

    });

    if (updatedValues?.mobile?.length != 10) {
        // console.log(updatedValues?.mobile?.length);
        error = { ...error, mobileError: "Invalid mobile number" }
        flag++;
    }

    if (flag > 0) {
        return res.json({ success: 0, error });
    }


    //get the current local path of the uploaded image
    // following gives the current local path where the file is uploaded
    let profileImageLocalPath = null // image may not be uploaded
    if (req.files?.profileImage?.length) {
        // if the file is sent fromt the user side then upload it
        profileImageLocalPath = req.files?.profileImage[0]?.path
        // upload the file on cloudinary
        const { url } = await uploadOnCloudinary(profileImageLocalPath)

        updatedValues.image = url;
    }



    //    console.log("final val",updatedValues);


    const user = await User.findByIdAndUpdate(id, updatedValues, { new: true });
    res.json({ success: 1, user, error })

})
exports.deleteUser = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.json(user);

    // console.log(error)
    res.sendStatus(400);

})

// /api/user/loggerInUserDetails
exports.getLoggedInUserDetails = asyncHandler(async (req, res) => {

    const { _id } = req.user;

    let data = await User.findById(_id)
        .populate("branch", "branchName branchCode")
        .select(" -password -refreshToken ");

    res.json(data);
})

exports.logout = asyncHandler(async (req, res) => {
    const userDataFromAuthMiddleware = req.user;
    // console.log(userDataFromAuthMiddleware?._id)
    await User.findByIdAndUpdate(
        userDataFromAuthMiddleware?._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const option = {
        httpOnly: true,
        secure: true // this ensures that only server can modify the cookies... but default anyone can modify it which is not good
    }


    console.log('User logged out succefully');

    res.status(200)
        .clearCookie('accessToken', option)
        .clearCookie('refreshToken', option)
        .json({
            success: 1,
            message: 'User logged out succefully'
        })

})

exports.changePassword = asyncHandler(async (req, res) => {

    const { password, newPassword, confirmNewPassword } = req.body;
    // console.log(req.body);
    const updatedValues = req.body
    let flag = 0;
    let error = {}
    Object.entries(updatedValues).forEach(([key, value]) => {
        if (value === "") {
            const newKey = key.toString() + "Error";
            error = { ...error, [newKey]: `${key} can't be empty` };
            flag++;
        }
    });

    if (flag) {
        return res.json({
            sucess: 0,
            errors: error,
            message: ""
        })
    }


    if (newPassword !== confirmNewPassword) {
        return res.json({
            sucess: 0,
            errors: {
                otherError: "Confirm new password and new password not matching"
            },
            message: ""
        })
    }

    if (password === newPassword) {
        return res.json({
            sucess: 0,
            errors: {
                otherError: "Please type a password different from current password!!"
            },
            message: ""
        })
    }

    const id = req.user?._id;
    const user = await User.findById(id);

    if (!user) {
        return res.json({
            sucess: 0,
            errors: {
                otherError: "Unauthorized access"
            },
            message: ""
        })
    }

    const isMatch = await user.isPasswordCorrect(password)

    if (isMatch === true) {
        user.password = newPassword;
        await user.save({ validateBeforeSave: false })
        return res
            .status(200)
            .json({
                sucess: 1,
                message: "password changed successfully!!!",
                errors: {}
            })
    }
    else {
        return res.json({
            sucess: 0,
            errors: {
                otherError: "Wrong old password"
            },
            message: ""
        })
    }

})