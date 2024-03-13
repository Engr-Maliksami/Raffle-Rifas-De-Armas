const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// New route for creating a new admin and logging in
router.post('/register-admin-and-login', async (req, res) => {
    try {
        // Create a new admin
        const adminData = {
            username: 'admin2',
            email: 'admin2@example.com',
            password: 'adminpassword2', // Change this to a secure password
            role: 'admin',
        };

        // Check if the admin already exists
        const existingAdmin = await User.findOne({ username: adminData.username });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(adminData.password, 10);
        adminData.password = hashedPassword;

        // Create the new admin user
        const adminUser = new User(adminData);
        await adminUser.save();

        // Log in the new admin
        // You can use a similar approach as your existing login logic
        // For simplicity, you may want to implement session handling or JWT for authentication.
        res.json({ message: 'Admin registered and logged in successfully.' });

    } catch (error) {
        console.error('Error registering admin and logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
