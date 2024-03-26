const { asyncHandler } = require("../utils/asyncHandler.js");
const { Announcement } = require('../models/announcements.model');

exports.getAllAnnouncements = asyncHandler(async (req, res) => {
    // this will take out all the announcements from the announcements table

    /**
     * the data from mongo db databases are BSON 
     * always convert them to object using .toObject() function
     */

    let { isResults } = req.params
    isResults = (isResults === "false") ? (false) : (true);

    /**
     * we need to send in response virtual attributes named as formattedTime and formattedDate
     */
    const allAnnouncements = await Announcement
        .find({ isResults: isResults })
        .populate("announcer","name email image userType isAdmin")
        .select("+formattedTime +formattedDate")
        .sort({ updatedAt: -1 })
        .exec()

    // console.log("allAnnouncements");
    // console.log( allAnnouncements);

    let newAllAnnouncements = [];
    for(let obj of allAnnouncements){
        obj = obj.toObject();

        const {announcer:writer,...rest} = obj;
        obj = {writer,...rest};

        newAllAnnouncements.push(obj);
    }
    res.json(newAllAnnouncements)

})

exports.addAnnouncement = asyncHandler(async (req, res) => {

    const isResults = (req.params.isResults === "true")

    const content = req.body.content

    const announcer = req.user._id

    let announcement = new Announcement({
        content,
        isResults,
        announcer
    })

    await announcement.save();

    let data = await announcement.populate("announcer","name email image isAdmin userType")

    // console.log("pop data: ",data);
    data = data.toObject()
    const {announcer:writer,...rest} = data;
    data = {writer,...rest};

    // console.log("final: ",data);
    res.status(201).json({
        success: 1,
        message: "Announcement added sucessfully",
        data,
    })


})

exports.getSingleAnnouncement = asyncHandler(async (req, res) => {
    let id = req.params._id
   
    let announcement = await Announcement
                        .findById(id)
                        .populate("announcer","name email userType isAdmin image");

    announcement = announcement.toObject();
    // console.log("announc: ",announcement);

    const {announcer:writer,...rest} = announcement;
    announcement = {writer,...rest};
    // console.log(announcement);

    res.json(announcement)
})

exports.deleteAnnouncement = asyncHandler(async (req, res) => {
    const id = req.params._id; // ID of the announcement
    // console.log(id);
    // Find and delete the announcement from the database
    let deletedAnnouncement = await Announcement.findByIdAndDelete(id);

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
    // console.log("formContent", formContent);
    const { _id } = req.params;
    // console.log(_id);
    const docc = await Announcement.countDocuments({ _id })
    // console.log("no of doc", docc);
    const announcement = await Announcement.findOneAndUpdate({ _id }, { content: formContent }, { new: true, runValidators: true })
    await announcement.save()
    res.json({ success: 1, message: "Announcement Updated Sucessfully!!" })
})

