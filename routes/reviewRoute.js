const express = require('express');
const { getReview, createReview } = require('../controllers/reviewController');
const { updateRating } = require('../controllers/hotelController');
const router = express.Router();

router.get('/hotels/:id', getReview);
router.post('/', createReview);
router.put('/hotels/updateRating', updateRating);

module.exports = router;
