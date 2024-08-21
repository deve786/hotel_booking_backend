// Import User model (assuming you have a User model)
const User = require('../models/userModel');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;
        const user = new User({ name, email, password, isAdmin });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const exstingUser = await User.findOne({ email });

        if (!exstingUser || !exstingUser.isPasswordMatch(password)) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                name: exstingUser.name,
                email: exstingUser.email,
                isAdmin: exstingUser.isAdmin,
                id:exstingUser._id
            },
        });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'An error occurred during login' });
    }
};