const express = require('express');

const { verifyToken } = require('../middleware/authMiddleware');
const { getAllBookings, getBookingById, createBooking, deleteBooking, getBookingsByUserId, getPastBookingsByUserId } = require('../controllers/bookingController');

const router = express.Router();


router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.post('/', createBooking);
router.get('/current/:id', getBookingsByUserId);
router.get('/past/:id', getPastBookingsByUserId);
router.delete('/:id', deleteBooking);

module.exports = router;
