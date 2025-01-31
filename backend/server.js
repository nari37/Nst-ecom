
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import connectcloudinary from './config/cloudinary.js';
import dotenv from 'dotenv';
import userrouter from './routes/userroute.js';
import productrouter from './routes/productroute.js';
import cartrouter from './routes/cartroute.js';
import orderrouter from './routes/orderroute.js';

const app = express();
dotenv.config();
const port = process.env.PORT || 4001;

connectcloudinary();
app.use(express.json());

// Correct CORS Configuration
const allowedOrigins = ['http://localhost:5174', 'https://nst-ecom-frontend.onrender.com'];
app.use(cors({
  origin: (origin, callback) => {
    
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes

app.get('/',(req,res)=>{
    res.send("Api is WOrking...")
});
app.use('/api/user', userrouter);
app.use('/api/product', productrouter);
app.use('/api/cart', cartrouter)
app.use('/api/order', orderrouter)



app.listen(port, () => console.log('Server started on PORT : ' + port));
