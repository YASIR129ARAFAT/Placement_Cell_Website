const express = require('express')

const router = express.Router()

const {
    getComments,
    addComment
} = require('../controllers/comments.controller.js')

/**
 * /api/comments/
 */
router.get('/:commentorId', getComments)
    .post('/addComment', addComment)

exports.CommentsRouter = router