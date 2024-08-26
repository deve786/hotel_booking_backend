// Import Booking model (assuming you have a Booking model)
const Booking = require('../models/bookingModel');

// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new booking

exports.createBooking = async (req, res) => {
    try {
        // Extract data from request body
        const { user, hotelId, checkInDate, checkOutDate, guestCount, totalCost } = req.body;
        // console.log(user);

        // Create a new booking instance
        const booking = new Booking({
            user,
            hotelId,
            checkInDate,
            checkOutDate,
            guestCount,
            totalCost
        });

        // Save the booking to the database
        await booking.save();

        // Respond with the created booking
        res.status(201).json(booking);
    } catch (err) {
        // Log the error for debugging
        console.error('Error creating booking:', err.message);

        // Respond with an error message
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getBookingsByUserId = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    
    try {
        // Get current date
        const currentDate = new Date();

        // Find upcoming bookings
        const upcomingBookings = await Booking.find({
            user: id,
            checkInDate: { $lt: currentDate }
        });
        console.log(upcomingBookings);
        

        // Return the empty array with a success status
        res.status(200).json(upcomingBookings);
    } catch (error) {
        // Send generic error message
        res.status(500).json({ message: 'Error fetching upcoming bookings for user', error });
    }
};

exports.getPastBookingsByUserId = async (req, res) => {
    const { id } = req.params;
    // console.log(id);

    try {
        // Find all bookings for the user where the check-out date is in the past
        const pastBookings = await Booking.find({
            user: id,
            checkOutDate: { $lt: new Date() }  // $lt is a MongoDB operator for 'less than'
        });

       

        res.status(200).json(pastBookings);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.userTotalBooking = async (req, res) => {
    try {


        const bookings = await Booking.find({ user: req.params.userId });


        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.userPendingBookings = async (req, res) => {
    try {
        const userId = req.params.userId;
        const today = new Date();

        // Find pending bookings where the checkout date is after today's date
        const pendingBookings = await Booking.find({
            user: userId,
            checkOutDate: { $gte: today } // Filter for bookings where checkoutDate is greater than or equal to today's date
        });

        res.status(200).json(pendingBookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.userCompletedBookings = async (req, res) => {
    try {
        const userId = req.params.userId;
        const today = new Date();

        // Find completed bookings where the checkout date is before today's date
        const completedBookings = await Booking.find({
            user: userId,
            checkOutDate: { $lt: today } // Filter for bookings where checkoutDate is less than today's date
        });
        console.log(completedBookings);


        res.status(200).json(completedBookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};