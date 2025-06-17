import express from 'express';
import UserModel from '../models/userModel.js'; // Adjust the path as necessary
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = express.Router();
router.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const newUser = await UserModel.create({ username, email, password });
        res.status(201).json({ message: 'User registered successfully', user: newUser, success: true });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message, success: false });
    }
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username });
        if (!user) {        
            return res.status(404).json({ message: 'User not found', success: false });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials', success: false });
        }
        jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.error('Error signing token:', err);
                return res.status(500).json({ message: 'Error signing token', error: err.message, success: false });
            }
            res.status(200).json({ message: 'Login successful', user: { username }, isAdmin: user.admin, token, success: true });
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message, success: false });
    }
});
export default router;