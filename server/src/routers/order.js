import express from "express";
import { OrderModel } from "../models/Order.js";
import { ProductModel } from "../models/Product.js";

const router = express.Router();


//Add Address to user

router.post("/setAddress", async (req, res) => {
  const { userID, userAddress } = req.body;

  try {
    const addressExist = await OrderModel.findOne({ userID });
    if (addressExist) {
      addressExist.userAddress = userAddress;
      await addressExist.save();
      res.json({ message: "Address updated Successfully" });
    }
    // Create a new order
    else {
      const order = new OrderModel({
        userID,
        userAddress,
        // payment,
      });
      await order.save();
      res.json({ message: "Address added Successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//fetch user address

router.get("/:userID", async (req, res) => {
  const userID = req.params.userID;

  try {
    const order = await OrderModel.findOne({ userID }); // Find the order by userID
    if (order) {
      // If the order is found, return the user's address
      const userAddress = order.userAddress;
      // console.log(userAddress[0].addressLine1);
      res.json({ userAddress });
    } else {
      // If the order is not found, return an appropriate message
      res.json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/placeOrder", async (req, res) => {
  const { userID, userAddress, cartItems } = req.body;
  const productID = cartItems.productID;
  try {
    const product = await ProductModel.findById(productID);

    if (!product) {
      // return res.json({ message: productID});
      console.log(productID);
    }
    const orderExist = await OrderModel.findOne({ userID });
    if (orderExist) {
      const existingItem = orderExist.cartItems.find(
        (item) => item.productID.toString() === productID
      );
      if (!existingItem) {
        orderExist.cartItems.push({
          productID,
          name: product.name,
          brand: product.brand,
          dressType: product.dressType,
          stock: product.stock,
          size: product.size,
          imageUrl: product.imageUrl,
          price: product.price,
        });
        await orderExist.save();
        res.json({ message: "Order placed " });
      }
    }
    // Create a new order
    else {
      const order = new OrderModel({
        userID,
        userAddress,
        cartItems,
        // payment,
      });
      await order.save();
      res.json({ message: "Order placed Successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router as orderRouter };
