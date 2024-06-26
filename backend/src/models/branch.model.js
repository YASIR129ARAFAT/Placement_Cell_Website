const mongoose = require('mongoose')
const { Schema } = mongoose

// this will contain both results and all announcemets 

const BranchSchema = new Schema(
    {
        branchCode: { type: String, required: true, unique:true },
        branchName: { type: String, required: true },
    },
    {
        timestamps: true,
    }
)



exports.Branch = mongoose.model("Branch",BranchSchema)