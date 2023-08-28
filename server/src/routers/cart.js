import express from "express";
import { CartModel } from "../models/cart.js";

const router = express.Router();

router.get('/show',async(req,res)=>{
  const { userID} = req.body;

  try{
    const cart = await CartModel.find({userID})
 if(cart){
 res.json(cart)
 }
    
  }
  catch (error) {
    res.json({ error: error.message });
}
})

router.post("/add", async (req, res) => {
  const { userID, cartItems } = req.body;
  const productID = cartItems.productID;
  const quantity = cartItems.quantity;

  try {
    const user = await CartModel.findOne({ userID });

    if (user) {
      const product = await CartModel.findOne({
        userID: user.userID,  // Ensure the product is within the user's cart
        "cartItems.productID": productID,
      });

      if (product) {
        await CartModel.findOneAndUpdate(
          { userID, "cartItems.productID": productID },  // Update specific user's cart
          {
            $inc: { "cartItems.$.quantity": quantity },  // Increment quantity
          }
        );

        res.json({ message: "success quantity increased" });
      } else {
        await CartModel.findOneAndUpdate(
          { userID },
          {
            $push: {
              cartItems: cartItems,
            },
          }
        );

        res.json({ message: "product added" });
      }
    } else {
      const cart = new CartModel({
        userID,
        cartItems: [cartItems],
      });

      await cart.save();
      res.status(201).json(cart);
     
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/delete',async (req, res) => {
  const { userID, cartItems } = req.body;
  const productID = cartItems.productID;
  const quantity = cartItems.quantity;
  try {
    const user = await CartModel.findOne({ userID });

    if (user) {
      const product = await CartModel.findOne({
        userID: user.userID,  // Ensure the product is within the user's cart
        "cartItems.productID": productID,
      });

      if (product) {
        await CartModel.findOneAndUpdate(
          { userID, "cartItems.productID": productID },  // Update specific user's cart
          {
            $inc: { "cartItems.$.quantity": -quantity },  // Increment quantity
          }
        );

        res.json({ message: "success quantity decreased" });
      } else {
        await CartModel.findOneAndUpdate(
          { userID },
          {
            $push: {
              cartItems: cartItems,
            },
          }
        );

        res.json({ message: "product added" });
      }
    } else {
      res.json({ message: "No user Found" });
     
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

export { router as cartRouter };
