const Hotel = require('../models/hotelModel');

// Get all hotels
exports.getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single hotel by ID
exports.getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
        res.status(200).json(hotel);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new hotel
exports.createHotel = async (req, res) => {
    try {
        const { name, location, description, amenities,pricePerNight } = req.body;
        // console.log(req.body);
        

        const photos = req.files.map(file => file.path); // Array of image file paths
        const hotel = new Hotel({
            name,
            location,
            
            amenities,
            photos ,
            description,
            pricePerNight,
        });
        await hotel.save();
        res.status(201).json(hotel);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an existing hotel
exports.updateHotel = async (req, res) => {
    try {
        const { name, location, rating, ratingCount, amenities, photos, description, pricePerNight } = req.body;
        const hotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { name, location, rating, ratingCount, amenities, photos, description, pricePerNight },
            { new: true }
        );
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
        res.status(200).json(hotel);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update the rating and rating count
exports.updateRating = async (req, res) => {
    try {
        const { hotelId, newRating } = req.body;
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

        // Calculate new average rating
        const totalRating = hotel.rating * hotel.ratingCount;
        const newRatingCount = hotel.ratingCount + 1;
        const newAverageRating = (totalRating + newRating) / newRatingCount;

        hotel.rating = newAverageRating;
        hotel.ratingCount = newRatingCount;

        await hotel.save();
        res.status(200).json(hotel);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a hotel
exports.deleteHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
        res.status(200).json({ message: 'Hotel deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getRandomHotels = async (req, res) => {
    try {
        const randomHotels = await Hotel.aggregate([{ $sample: { size: 3 } }]);
        res.status(200).json(randomHotels);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};