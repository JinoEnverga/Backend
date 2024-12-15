const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import your existing routes
const authRoutes = require('./routes/authRoutes');
const userRoute = require('./routes/userRoute');
const departmentRoutes = require('./routes/departmentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const studentsRoutes = require('./routes/studentsRoutes');

const app = express();
app.use(bodyParser.json());

// Configure CORS
const corsOptions = {
    origin: 'https://jino-final-git-main-jinoenvergas-projects.vercel.app', // Replace with your frontend domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use(cors(corsOptions));

app.get('/', function(req, res) {
    res.send("Jino Enverga, NCF");
});

// Use your existing routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoute);
app.use('/api/department', departmentRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/students', studentsRoutes);

const PORT = 8002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
