// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

const userController = {
    // Register (for creating admin or user)
    register: async (req, res) => {
        try {
            // Ensure that the password is provided
            if (!req.body.password) {
                return res.status(400).json({ error: 'Password is required' });
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                role: req.body.role, // Set the role based on the form data
            });
            await user.save();

            const roleMessage = user.role === 'admin' ? 'Admin' : 'User';
            res.status(201).json({ message: `${roleMessage} registered successfully.` });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Login (for admin or user login)
    login: async (req, res) => {
        // ... (unchanged)
    },
};

module.exports = userController;
