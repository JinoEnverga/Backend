const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Function
const register = async (req, res) => {
    const { fullname, username, password } = req.body;
    try {
        // Hash the password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert user data into the database
        const [rows] = await pool.query(
            'INSERT INTO users (fullname, username, password) VALUES (?, ?, ?)', 
            [fullname, username, hashedPassword]
        );
        
        // Respond with success message
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        // Handle errors and send 500 response
        res.status(500).json({ error: err.message });
    }
};

// Login Function
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Fetch user from the database
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        // Check if user exists
        if (rows.length === 0) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        const user = rows[0];

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { user_id: user.user_id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME }
        );

        // Respond with the token
        res.json({ token });
    } catch (err) {
        // Handle errors and send 500 response
        res.status(500).json({ error: err.message });
    }
};

// Exporting register and login functions
module.exports = { register, login };
