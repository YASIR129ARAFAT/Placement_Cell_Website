const Opening = require("../models/openings.model.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const { User } = require('../models/user.models.js');
const { Comment } = require("../models/comments.model.js");



const addOpening = asyncHandler(async (req, res) => {
    const formData = req.body;
    const announcer = req?.user?._id;
    // console.log("form form: \n", formData);
    // console.log(announcer);

    let {
        companyName,
        offerType,
        internshipDuration,
        stipendPerMonth,
        ctc,
        location,
        branchesAllowed,
        cgpaCriteria,
        testDateAndTime,
        formLink,
        applicationDeadline,
        additionalInfo
    } = formData

    additionalInfo = additionalInfo.trim()

    /**
     * non empty fields should be
     *  companyName,
        offerType,
        location, // if location is not given by company in form the value will of 
        branchesAllowed,
        cgpaCriteria,
        applicationDeadline,

     */

    let error = {};
    let flag = 0;

    companyName = companyName.trim()
    if (companyName === "") {
        error = { ...error, companyNameError: "Company Name can't be empty" }
        flag++;
    }
    if (offerType === "") {
        error = { ...error, offerTypeError: "Offer type can't be empty" }
        flag++;
    }

    location = location.trim()
    if (location === "") {
        error = { ...error, locationError: "Location can't be empty" }
        flag++;
    }
    if (formLink === "") {
        error = { ...error, formLinkError: "Form Link can't be empty" }
        flag++;
    }
    if (branchesAllowed.length === 0) {
        error = { ...error, branchesAllowedError: "Branches allowed can't be empty" }
        flag++;
    }
    if (cgpaCriteria.length > 0) {
        cgpaCriteria.map((ele, ind) => {
            const { branch, cgpa } = ele;
            if (branch === "" || cgpa === "") {
                error = { ...error, cgpaCriteriaError: "Branch or cgpa can't be empty" }
                flag++;
            }
            if (cgpa > 10 || cgpa < 0) {
                error = { ...error, cgpaCriteriaError: "Cgpa must be betwen 0-10" }
                flag++;
            }
        })
    }

    if (applicationDeadline === "") {
        error = { ...error, applicationDeadlineError: "Application deadline can't be empty" }
        flag++;
    }


    const formattedBranchesAllowed = (branchesAllowed.length !== 0) ? (branchesAllowed.split(",")) : ([]);


    formattedBranchesAllowed.map((ele, ind) => {
        const newEle = ele.trim()
        formattedBranchesAllowed[ind] = newEle;
    })
    // console.log(formattedBranchesAllowed);

    if (offerType === "Internship") {
        /**
         * internshipDuration -> non empty
         * stipendPerMonth -> non-empty
         * ctc -> empty
         */

        if (internshipDuration === "") { // duration in months
            flag++;
            error = { ...error, internshipDurationError: "Internship duration can't be empty" }
        }
        if (internshipDuration <= 0) { // duration in months
            flag++;
            error = { ...error, internshipDurationError: "Internship duration can't be less than zero" }
        }
        if (stipendPerMonth === "") { // duration in thousands
            flag++;
            error = { ...error, stipendPerMonthError: "Internship duration can't be empty" }
        }
        if (ctc !== "") { // duration in lakhs
            flag++;
            error = { ...error, ctcError: "ctc must be empty" }
        }

        if (flag === 0) {
            let data = {
                announcer,
                companyName,
                offerType,
                internship: {
                    duration: internshipDuration,
                    stipendPerMonth
                },
                fullTime: {}, //this means that fullTime is not req
                cgpaCriteria,
                location,
                branchesAllowed: formattedBranchesAllowed,
                applicationDeadline,
                formLink,
                testDateAndTime,
                additionalInfo
            }

            const opening = new Opening(data);

            await opening.save()

            res.json({ success: 1, opening: opening });
        }


    }
    else if (offerType === "Full-time") {
        /**
        * internshipDuration ->  empty
        * stipendPerMonth -> empty
        * ctc -> non-empty
        */

        if (ctc === "") { // ctc in lpa
            flag++;
            error = { ...error, ctcError: "ctc must not be empty" }
        }

        if (flag === 0) {
            let data = {
                announcer,
                companyName,
                offerType,
                internship: {},
                fullTime: {
                    ctc,
                },
                cgpaCriteria,
                location,
                branchesAllowed: formattedBranchesAllowed,
                applicationDeadline,
                formLink,
                testDateAndTime,
                additionalInfo
            }

            const opening = new Opening(data);

            await opening.save()

            res.json({ success: 1, opening: opening });
        }

    }
    else if (offerType === "Internship + Full-time") {
        /**
         * internshipDuration ->  non-empty
         * stipendPerMonth -> non-empty
         * ctc -> non-empty
         */
        // console.log("int + full");
        if (internshipDuration === "") { // duration in months
            flag++;
            error = { ...error, internshipDurationError: "Internship duration can't be empty" }
        }
        if (stipendPerMonth === "") { // stipend in thousands
            flag++;
            error = { ...error, stipendPerMonthError: "Internship duration can't be empty" }
        }
        if (ctc === "") { // ctc in lpa
            flag++;
            error = { ...error, ctcError: "ctc must not be empty" }
        }

        if (flag === 0) {
            let data = {
                announcer,
                companyName,
                offerType,
                internship: {
                    duration: internshipDuration,
                    stipendPerMonth
                },
                fullTime: {
                    ctc
                },
                cgpaCriteria,
                location,
                branchesAllowed: formattedBranchesAllowed,
                applicationDeadline,
                formLink,
                testDateAndTime,
                additionalInfo
            }

            const opening = new Opening(data);

            await opening.save()

            res.json({ success: 1, opening: opening });
        }
    }
    else {
        flag++;
        error = { ...error, offerTypeError: "Invalid offer type" }
    }


    if (flag > 0) {
        res.json({ success: 0, error })
        return;
    }


})

// const hi = asyncHandler(async (req, res) => {
//     res.json({ hiiiii: "jjj" })
// })

const getAllOpenings = asyncHandler(async (req, res) => {

    const allOpenings = await Opening
        .find()
        .sort({ updatedAt: -1 })
        .exec()

    //why populate is not working

    let newAllOpenings = [];
    for (let obj of allOpenings) {
        obj = obj?.toObject()
        const announcer = await User
            .findById({ _id: obj?.announcer })
            .select("-password -refreshToken ")
            .exec()
        const newObj = { ...obj, announcer: announcer }

        newAllOpenings.push(newObj);
    }

    res.json({ success: 1, allOpenings: newAllOpenings })


})

const getSingleOpening = asyncHandler(async (req, res) => {
    const _id = req.params?._id
    // console.log("dsjchbdshvchsdv",_id);

    
    let opening = await Opening
        .findById(_id)
        .populate("announcer", "name email userType isAdmin image")
        .exec()

    res.json({ success: 1, opening })
})

const deleteOpening = asyncHandler(async (req, res) => {
    const _id = req.params?._id;

    //delete all the comments related to this opening 
    const comment = await Comment.deleteMany({ announcementId: _id })

    const opening = await Opening.findByIdAndDelete({ _id });

    res.json({ success: 1, message: "Deleted Successsfully!!" })

})

module.exports = { addOpening, getAllOpenings, deleteOpening, getSingleOpening }