import express, { urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {connectDB} from './src/config/db.js'

import diamondRouter from './src/routes/diamond.route.js';
import productRouter from './src/routes/product.route.js';
import authRouter from './src/routes/auth.route.js';
import userRouter from './src/routes/user.route.js';
import cartRouter from './src/routes/cart.route.js';
import orderRouter from './src/routes/order.route.js';





dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));

const port = process.env.PORT;

// Routes
app.use('/diamond', diamondRouter);
app.use('/product',productRouter)
app.use('/auth',authRouter)
app.use('/user',userRouter)
app.use('/cart',cartRouter)
app.use('/order',orderRouter)


app.get('/', (req, res) => {
    res.send('')
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})