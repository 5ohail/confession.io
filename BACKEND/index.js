import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/user.route.js';
import connectDB from './db/db.js';
dotenv.config();
app.use(cors({
    origin: '*'

}));
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