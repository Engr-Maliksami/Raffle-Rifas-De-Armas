// app.js
const express = require('express');
const session = require('express-session');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const app = express();
const PORT = 8000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve static files from the 'public' folder
app.use(express.static('public'));


// Set up sessions
app.use(session({
    secret: '139c86ca4071cae4194f173697a536b9ebaba7d70b2b5d6f5198c54d8a01c662', // Replace with your generated key
    resave: false,
    saveUninitialized: true,
}));



// Connect to the MongoDB Atlas cluster
connectDB();

// Routes
app.use('/users', userRoutes);

// Basic routing
app.get('/', (req, res) => {
    res.render('index');
});

// Render the login page
app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/allraffles', (req, res) => {
    res.render('allraffles');
});

app.get('/publishedraffle', (req, res) => {
    res.render('publishedraffle');
});

app.get('/unpublishedraffle', (req, res) => {
    res.render('unpublishedraffle');
});

app.get('/reviews', (req, res) => {
    res.render('reviews');
});


app.get('/createraffle', (req, res) => {
    res.render('createraffle');
});


// Start the server
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
