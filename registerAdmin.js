// registerAdmin.js
const connectDB = require('./config/database');
const User = require('./models/User');
const bcrypt = require('bcrypt');

async function registerAdmin() {
    // Connect to the MongoDB Atlas cluster
    await connectDB();

    // Sample admin data
    const adminData = {
        username: 'admin',
        email: 'admin@raffle.com',
        password: 'passwordraffle', // Change this to a secure password
        role: 'admin',
    };

    try {
        // Check if admin already exists
        const existingAdmin = await User.findOne({ username: 'admin' });
        if (existingAdmin) {
            console.log('Admin already exists.');
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(adminData.password, 10);
        adminData.password = hashedPassword;

        // Create the admin user
        const adminUser = new User(adminData);
        await adminUser.save();

        console.log('Admin registered successfully.');
    } catch (error) {
        console.error('Error registering admin:', error);
    } finally {
        // Close the connection after registration
        await mongoose.connection.close();
    }
}

// Run the registerAdmin function
registerAdmin();
