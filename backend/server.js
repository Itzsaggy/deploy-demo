const express = require('express');
const connectDB = require('./db/dbConnection');
const app = express();

const User = require('./db/user');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body);
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'Registration Successful' });
    } catch {
        res.status(400).json({ error: 'Registration Failed' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Invalid Username or Password' });
        }
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid Username or Password' });
        }
        res.status(200).json({ message: 'Login Successful' });
    } catch (error) {
        res.status(500).json({ message: 'Login Failed' });
    }
});

connectDB();

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
