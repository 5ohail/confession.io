import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/user.route.js';
import connectDB from './db/db.js';
import fs from 'fs'
dotenv.config();
app.use(cors({
    origin: '*'
}));
app.use((req,res,next)=>{
    fs.appendFile('./logs.txt',`${Date.now()} : ${req.ip} : ${req.method} : ${req.path}\n`,(err)=>{
        if(err) console.error('ERROR: ',err);
    });
    next();
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', router);
const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log(`Server is running on port http://localhost:${PORT}`);
    }
})
connectDB()