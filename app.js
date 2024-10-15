const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import your existing routes
const authRoutes = require('./routes/authRoutes');
const userRoute = require('./routes/userRoute');
const departmentRoutes = require('./routes/departmentRoutes');
const courseRoutes = require('./routes/courseRoutes');  // Import course routes
const studentsRoutes = require('./routes/studentsRoutes'); // Import students routes

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res) {
    res.send("Jino Enverga, NCF");
});

// Use your existing routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoute);
app.use('/api/department', departmentRoutes);
app.use('/api/course', courseRoutes);  // Include the course routes
app.use('/api/students', studentsRoutes); // Add this line to include the students routes

const PORT = 8002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
