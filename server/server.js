import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import errorHandler from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.routes.js'
import blogRoutes from './routes/blog.routes.js'

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors())


app.get("/home", (req,res)=>{
    res.json("hi")
})

app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));