const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();  // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());  // To parse incoming JSON requests
app.use(express.urlencoded({ extended: true }));  // To parse incoming URL-encoded data (form submissions)

// Backend routes
const contactRoutes = require('./routes/contact'); // Contact Routes
app.use('/contact', contactRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});