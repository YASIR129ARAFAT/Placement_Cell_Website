const express = require("express");

const router = express.Router()

const {
    getAllAnnouncements,getSingleAnnouncement, addAnnouncement,getAllResults,addResult, deleteAnnouncement,updateAnnouncement
} = require('../controllers/announcements.controller.js')

/**
 * /api/announcements
 */
router
    .get('/getallannouncements/:isResults',getAllAnnouncements)
    .post('/addannouncement/:isResults',addAnnouncement)
    .get('/:_id',getSingleAnnouncement)
    .delete('/:_id',deleteAnnouncement)  /**using .post() is not recommended + it will cause interference with .post('/addannouncement/:isResults) */
    .patch('/:_id',updateAnnouncement)
    

exports.AnnouncementsRouter = router