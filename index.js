const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/connect');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads/hotels', express.static(path.join(__dirname, 'uploads/hotels')));

// Connect to MongoDB
connectDB(); // Call the connection function

// Import and Define Routes
const authRoute = require('./routes/authRoute');
const hotelRoute = require('./routes/hotelRoute');
const bookingRoute = require('./routes/bookingRoute');
const userRoute = require('./routes/userRoutes');

app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelRoute);
app.use('/api/bookings', bookingRoute);
app.use('/api/users', userRoute);

app.get('/',(req,res)=>{
    res.send("Hello")
})
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
