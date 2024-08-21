const express = require('express');
const { getAllHotels, getHotelById, updateHotel, deleteHotel, createHotel, updateRating } = require('../controllers/hotelController');
const upload=require('../middleware/multerMiddleware')

const router = express.Router();

router.get('/', getAllHotels);
router.get('/:id', getHotelById);
router.post('/',upload ,createHotel);
router.put('/:id', updateHotel);
router.put('/rating', updateRating);
router.delete('/:id', deleteHotel);

module.exports = router;
