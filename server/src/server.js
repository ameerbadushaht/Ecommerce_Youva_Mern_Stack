
import { userRouter } from "./routers/users.js";
import productRouter from './routers/product.js';
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { sellerRouter } from "./routers/seller.js";
import { favRouter } from "./routers/favorite.js";
import { cartRouter } from "./routers/cart.js";
import { orderRouter } from "./routers/order.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://ameer:ameer123@ecom.caioktm.mongodb.net/ecomData?retryWrites=true&w=majority",
    {
        useNewUrlParser : true,
        useUnifiedTopology: true,
      }
    ) .then(() => console.log('Now connected to MongoDB!'))

app.use('/users',userRouter)
app.use('/products', productRouter);
app.use('/seller',sellerRouter);
app.use('/fav',favRouter);
app.use('/cart', cartRouter);
app.use('/order',orderRouter)

app.listen(3001, () => console.log("listening on"));
