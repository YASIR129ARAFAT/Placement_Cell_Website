const { Branch } = require("../models/branch.model");
const { asyncHandler } = require("../utils/asyncHandler");

exports.addBranch = asyncHandler(async(req,res)=>{
    const {branchName,branchCode} = req.body
    const branch = new Branch({
        branchName,
        branchCode
    })
    await branch.save()

    res.json({success:1, message:"branch added"})
})
exports.getBranches = asyncHandler(async(req,res)=>{
    const branch  = await Branch.find({}); // gives all the branches 
    // an array of objects will be returned

    res.json({success:1, branches:branch,message:"Branches recieved successfully!!"})
})