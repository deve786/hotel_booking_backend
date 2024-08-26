const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
    try {
        // Find all users where isAdmin is false
        const users = await User.find({ isAdmin: false });
        res.status(200).json(users); // Send the list of non-admin users as a JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error }); // Handle errors
    }
};

exports.getSingleUser = async (req, res) => {
    try {

        const userId = req.params.id;
        // console.log(userId);

        // Find user by ID
        const user = await User.findById(userId)

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Send user data as response
        res.status(200).json(user);
    } catch (err) {
        // Handle errors
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}


exports.updateUserDetails = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Find and delete the user by ID
        const result = await User.findByIdAndDelete(userId);

        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}