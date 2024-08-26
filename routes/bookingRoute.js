const express = require('express');

const { verifyToken } = require('../middleware/authMiddleware');
const { getAllBookings, getBookingById, createBooking, deleteBooking, getBookingsByUserId, getPastBookingsByUserId, userTotalBooking, userCompletedBookings, userPendingBookings } = require('../controllers/bookingController');

const router = express.Router();


router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.post('/', createBooking);
router.get('/current/:id', getBookingsByUserId);
router.get('/past/:id', getPastBookingsByUserId);
router.get('/user/:userId', userTotalBooking);
router.get('/user/:userId/pending', userPendingBookings);
router.get('/user/:userId/completed', userCompletedBookings);
router.delete('/:id', deleteBooking);

module.exports = router;
