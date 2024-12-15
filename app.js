const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Ensure to use dotenv for environment variables

// Import your existing routes
const authRoutes = require('./routes/authRoutes');
const userRoute = require('./routes/userRoute');
const departmentRoutes = require('./routes/departmentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const studentsRoutes = require('./routes/studentsRoutes');

const app = express();
app.use(bodyParser.json());

// Configure CORS
const allowedOrigins = [
    'https://jino-final-git-main-jinoenvergas-projects.vercel.app', // Production frontend
    'http://localhost:5173', // Local development frontend
];

// Dynamic CORS setup
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow requests if origin is in the list
        } else {
            callback(new Error('Not allowed by CORS')); // Reject other origins
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and headers like Authorization
};
app.use(cors(corsOptions));

// Handle preflight (OPTIONS) requests globally
app.options('*', cors(corsOptions));

// Define a simple root route for testing
app.get('/', (req, res) => {
    res.send("Jino Enverga, NCF");
});

// Use your existing routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoute);
app.use('/api/department', departmentRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/students', studentsRoutes);

// Centralized error handling middleware
app.use((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({ error: 'CORS policy does not allow this origin' });
    }
    res.status(500).json({ error: err.message });
});

// Server configuration
const PORT = process.env.PORT || 8002; // Use environment variable for port if available
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
