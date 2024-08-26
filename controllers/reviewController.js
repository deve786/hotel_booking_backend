const Hotel = require("../models/hotelModel");
const Review = require("../models/reviewModel");

exports.createReview = async (req, res) => {
    try {
        const { hotelId, userId, text,stars  } = req.body;
        // console.log(req.body);

        // Validate input
        if (!hotelId || !userId || !text) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new review
        const newReview = new Review({
            hotelId,
            userId,
            text,
            stars 
        });

        // Save the review to the database
        await newReview.save();

        // Respond with success
        res.status(201).json({ message: 'Review created successfully', review: newReview });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


exports.getReview = async (req, res) => {
    const {id}=req.params
    // console.log(id);
    
    try {
        const reviews = await Review.find({  hotelId: id  });
        res.status(200).json(reviews);
        // console.log(reviews);
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    


}


exports.updateRating = async (req, res) => {
    try {
        console.log("asd");
        
        const { hotelId, newRating } = req.body; // newRating comes from the submitted review
        console.log(req.body);
        
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

        // Calculate new average rating
        const totalRating = hotel.rating * hotel.ratingCount; // Current total rating
        const newRatingCount = hotel.ratingCount + 1; // Increment rating count
        const newAverageRating = (totalRating + newRating) / newRatingCount; // New average rating

        hotel.rating = newAverageRating; // Update hotel's rating
        hotel.ratingCount = newRatingCount; // Update hotel's rating count

        await hotel.save(); // Save updated hotel data
        res.status(200).json(hotel);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};