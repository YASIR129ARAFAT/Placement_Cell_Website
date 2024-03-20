const { asyncHandler } = require("../utils/asyncHandler.js");
const { Announcement } = require('../models/announcements.model');
const { User } = require("../models/user.models.js");

exports.getAllAnnouncements = asyncHandler(async (req, res) => {
    // this will take out all the announcements from the announcements table

    /**
     * the data from mongo db databases are BSON always convert them to object using .toObject()     function
     */

    let { isResults } = req.params
    isResults = (isResults === "false") ? (false) : (true);
    // console.log(isResults,typeof isResults);

    /**
     * we need to send in response virtual attributes named as formattedTime and formattedDate
     */
    const allAnnouncements = await Announcement
        .find({ isResults: isResults })
        .select("+formattedTime +formattedDate")
        .sort({ updatedAt: -1 })
        .exec()

    // console.log("allAnnouncements");
    // console.log(typeof allAnnouncements);
    // console.log( "all annouhncememe virtaul\n");

    // let  p = allAnnouncements[0].formattedTime;
    // console.log(p);
    // p = await p.toObject()
    // console.log(p[0]?.formattedTime);
    // console.log("req.user from all annc controller")
    // console.log(req.user)

    let newAllAnnouncements = []
    for (let obj of allAnnouncements) {

        obj = obj.toObject()

        const announcer = obj?.announcer

        // console.log("obj33");
        // console.log(obj?.formattedTime);

        // console.log(announcer);
        let announcerData = await User.findById({ _id: announcer })
                    .select("email name enrolmentNo isAdmin -_id +formattedDOB")
                    .lean()
                    .exec()
        // _id has to be specifically removed otherwise it will replces _id of single announcement


        const newObj = { ...obj, ...announcerData }
        // console.log(newObj);

        newAllAnnouncements.push(newObj)
    }
    // console.log("new all announcements");
    // console.log(newAllAnnouncements);

    res.json(newAllAnnouncements)


})

exports.addAnnouncement = asyncHandler(async (req, res) => {

    const isResults = (req.params.isResults === "true")

    const content = req.body.content


    const announcer = req.user._id

    // const announcer = "65b66d6187d8a2e290777b60"

    // console.log("announcer");
    // console.log(announcer);


    const announcement = new Announcement({
        content,
        isResults,
        announcer
    })

    await announcement.save();
    // console.log("announcement",announcement);
    const obj = announcement.toObject()

    /**
     * preparing the data to be sent
     * This includes all the info from of the announcement/result 
       including announcer data time etc
     * The data to be sent as response will contain two virtual fields as formattedDate 
       and formattedTime
     */
    let id = obj?._id

    let newAnnc = await Announcement.findById(id);
    newAnnc = newAnnc.toObject();

    const announcerData = await User.findById(newAnnc?.announcer);
    const { _id, ...rest } = (announcerData).toObject();
    const responseData = { ...newAnnc, announcer: announcerData?._id, ...rest }

    res.status(201).json({
        success: 1,
        message: "Announcement added sucessfully",
        data: responseData,
    })

})

exports.getSingleAnnouncement = asyncHandler(async (req, res) => {
    let id = req.params._id
    // id = new mongoose.Types.ObjectId(id);
    // console.log("id from controller");
    // console.log(id);
    let announcement = await Announcement.findById(id);
    announcement = announcement.toObject();

    // announcement.time = updatedAtTime
    // announcement.date = updatedAtDate;

    const announcerData = await User.findById(announcement.announcer);
    const { _id, ...rest } = announcerData.toObject();
    const responseData = { ...announcement, announcer: announcerData._id, ...rest }
    // console.log(responseData);
    res.json(responseData)
})

exports.deleteAnnouncement = asyncHandler(async (req, res) => {
    const id = req.params._id; // ID of the announcement
    // console.log(id);
    // Find and delete the announcement from the database
    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);

    // Check if the announcement was found and deleted successfully
    if (deletedAnnouncement) {
        res.status(200).json({
            success: 1,
            message: "Announcement deleted successfully",
        });
    } else {
        res.status(404).json({
            success: 0,
            message: "Announcement not found",
        });
    }
});

exports.updateAnnouncement = asyncHandler(async (req, res) => {
    const { formContent } = req.body // updated content of the form
    console.log("formContent", formContent);
    const { _id } = req.params;
    // console.log(_id);
    const docc = await Announcement.countDocuments({ _id })
    console.log("no of doc", docc);
    const announcement = await Announcement.findOneAndUpdate({ _id }, { content: formContent }, { new: true, runValidators: true })
    await announcement.save()
    res.json({ success: 1, message: "Announcement Updated Sucessfully!!" })
})

