const express = require('express')
const {
    getAllSelections,
    deleteSelection,
    addSelections
} = require('../controllers/selections.controller.js')
const { authMiddleware } = require('../middlewares/auth.middleware.js')

const router = express.Router()

/**
 * /api/selection
 */
router
    .get('/getAllSelections', getAllSelections)
    .delete('/deleteSelection/:_id', authMiddleware, deleteSelection)
    .post('/addSelections/:_id',authMiddleware, addSelections)

exports.SelectionRouter = router