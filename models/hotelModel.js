const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0, // Default rating is 0
        min: 0,
        max: 5, // Assuming rating is out of 5
    },
    ratingCount: {
        type: Number,
        default: 0, // Default rating count is 0
    },
    amenities: {
        type: [String], // Array of strings for amenities
        required: true,
    },
    photos: {
        type: [String], // Array of strings for photo URLs
        required: true,
    },
    description: {
        type: String,
    },
    pricePerNight: {
        type: Number,
        required: true,
    },
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
