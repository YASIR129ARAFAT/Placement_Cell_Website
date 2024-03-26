const express = require('express')

const router = express.Router()

const {
    getComments,
    addComment,
    deleteComment
} = require('../controllers/comments.controller.js')

/**
 * /api/comments/
 */
router.get('/:commentorId', getComments)
    .post('/addComment', addComment)
    .delete('/deleteComment/:_id',deleteComment)

exports.CommentsRouter = router