import express from 'express';
const router = express.Router();
router.post('/login', (req, res) => {
    const {username, password} = req.body;
    // Implement your login logic here
    res.status(200).json({message: 'Login successful', user: {username},success:true});
});
export default router;