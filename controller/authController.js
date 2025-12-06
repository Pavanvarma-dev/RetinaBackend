// ...existing code...
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require('dotenv').config();
const Users = require('../models/Users');

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'username, email and password are required' });
        }

        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const imageBuffer = req.file ? req.file.buffer : null;

        
        
        const created = await Users.create({
            username,
            email,
            password: hashedPassword,
            profilePicture: imageBuffer
        });
          const token = jwt.sign({ id: created.userID, email: created.email }, process.env.JWT_SECRET, { expiresIn: '30m' });
        return res.status(201).json({ message: 'User Registered Successfully', user: created, token });
    } catch (err) {
        console.error('Register error:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'email and password are required' });
        }

        const user = await Users.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: 'User does not Exist' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Incorrect Password' });

        const token = jwt.sign({ id: user.userID, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30m' });

        return res.status(200).json({ message: 'User Logged In Successfully', token, id: user.userID});
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};