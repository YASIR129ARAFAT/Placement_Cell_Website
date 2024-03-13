const express = require('express');
const { addOpening, hi } = require('../controllers/openings.controller');
const router = express.Router();

/**
 * /api/opening
 */
router.post('/addOpening',addOpening)
.get('/open',hi)


exports.OpeningsRouter = router