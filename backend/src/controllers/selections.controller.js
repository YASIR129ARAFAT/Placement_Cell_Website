const { Branch } = require("../models/branch.model.js");
const { Selection } = require("../models/selections.model.js");
const { User } = require("../models/user.models.js");
const { asyncHandler } = require("../utils/asyncHandler.js");


const getAllSelections = asyncHandler(async (req, res) => {
    let selection = await Selection
        .find()
        .sort({ updateAt: -1 })
        .select("+fomattedTime +formattedDate")
        .populate("companyId", "companyName offerType formattedTestDate formattedTestTime")
        .populate({
            path: "studentId",
            select: "name branch image enrolmentNo",
            populate: {
                path: "branch",
                select: "branchCode branchName" // Add the fields you want from the Branch model
            }
        })


    const newSelection = []
    for (let obj of selection) {
        obj = obj.toObject()
        const { studentId: studentDetails, companyId: companyDetails, ...rest } = obj
        const newObj = { studentDetails, companyDetails, ...rest };

        newSelection.push(newObj)
    }
    // console.log(newSelection);
    res.json({ newSelection });

})

const deleteSelection = asyncHandler(async (req, res) => {
    const { _id } = req.params;

    const selection = await Selection.findByIdAndDelete(_id);
    if (!selection) {
        res.status(400).json({ success: 0, message: "failed to delete" })
    }
    else {
        res.status(200).json({ success: 1, message: "Deleted successfully" })
    }
})
const addSelections = asyncHandler(async (req, res) => {
    const { _id } = req.params; // id of selection

    const enrolmentNoArr = req.body?.enrolmentNo

    const enrolments = []
    let flag = 0;
    enrolmentNoArr.map((ele) => {
        // console.log(typeof ele?.enrolmentNo);
        let enrolmentStr = ele?.enrolmentNo
        // console.log(enrolmentStr);
        if (enrolmentStr === "") {
            flag++;
        }
        else {
            enrolments.push(enrolmentStr);
        }
    })

    if (flag >= 1) {
        res.json({ success: 0, message: "Enrolment No can't be empty" })
        return
    }

    const userIds = [];
    const promise = enrolments.map(async (ele) => {
        try {
            const user = await User.findOne({ enrolmentNo: ele });
            // console.log(user);
            if (!user) {
                return Promise.reject()
            } else {
                userIds.push(user?._id)
                return Promise.resolve()
            }
        } catch (error) {
            // console.log(error);
            return Promise.reject(error)
        }
    })
    Promise.all(promise)
        .then(() => {
            // console.log(enrolments);
            // console.log(userIds);

            const promise2 = userIds.map(async (userId) => {
                try {

                    const selection = new Selection({
                        studentId: userId,
                        companyId: _id
                    })
                    await selection.save()
                    return Promise.resolve()
                } catch (error) {
                    // console.log(error);
                    return Promise.reject(error)
                }
            })

            Promise.all(promise2)
                .then(() => {
                    res.json({ success: 1, message: "Selections added..." });
                })
                .catch(() => {
                    res.json({ success: 0, message: "internal error occured.." });
                })
        })
        .catch(() => {
            res.json({ success: 0, message: "Invalid Enrolment No" });
        })



})

module.exports = { getAllSelections, deleteSelection, addSelections }