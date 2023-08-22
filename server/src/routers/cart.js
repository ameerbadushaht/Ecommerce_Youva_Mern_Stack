import express from "express";
import { CartModel } from "../models/cart.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  const { userID } = req.body;
  const { productID } = req.body.cartItems.productID;

  const user = await CartModel.findOne({ userID });
  if (user) {
    try {
      const product = await CartModel.findOne({ productID });
      if (product) {
        
      }else{
        return res.json({ message: "Product not found" });
      }

      // CartModel.findOneAndUpdate({ userID},{
      //   "$push":{"cartItems":req.body.cartItems}})

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    try {
      const cart = new CartModel({
        userID,
        cartItems: [req.body.cartItems],
      });
      cart.save();
      res.status(201).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
});

export { router as cartRouter };
