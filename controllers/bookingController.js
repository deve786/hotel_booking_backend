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
        console.log(user);

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
    console.log('User ID:', req.params.id); // Debug line
    const { id } = req.params;

    try {
        // Assuming you have `checkInDate` in your Booking model to determine if a booking is upcoming
        const currentDate = new Date();
        const upcomingBookings = await Booking.find({ user: id, checkInDate: { $gt: currentDate } });

        if (!upcomingBookings.length) {
            return res.status(404).json({ message: 'No upcoming bookings found for this user' });
        }

        res.status(200).json(upcomingBookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching upcoming bookings for user', error });
    }
};

exports.getPastBookingsByUserId = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        // Find all bookings for the user where the check-out date is in the past
        const pastBookings = await Booking.find({
            user: id,
            checkOutDate: { $lt: new Date() }  // $lt is a MongoDB operator for 'less than'
        });

        if (!pastBookings.length) return res.status(404).json({ message: 'No past bookings found for this user' });

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
