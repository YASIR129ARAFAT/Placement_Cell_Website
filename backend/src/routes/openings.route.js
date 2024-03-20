const express = require('express');
const router = express.Router();


const {
    addOpening,
    getAllOpenings,
    deleteOpening
} = require('../controllers/openings.controller.js');


const { isAdminMiddleware } = require('../middlewares/isAdmin.middleware.js');
const { authMiddleware } = require('../middlewares/auth.middleware.js');


/**
 * /api/opening
 */

router
    .post('/addOpening', authMiddleware, isAdminMiddleware, addOpening)
    .get('/getAllOpenings', authMiddleware, getAllOpenings)
    .delete('/deleteOpening/:_id', authMiddleware, deleteOpening)


exports.OpeningsRouter = router