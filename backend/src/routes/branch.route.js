const express = require('express')
const { Branch } = require('../models/branch.model')
const { addBranch,getBranches } = require('../controllers/branch.controller')

const router = express.Router()



/**
 * /api/comments/
 */
router
    .post('/addBranch', addBranch)  //  /api/branch/add
    .get("/getBranches",getBranches)

exports.BranchRouter = router