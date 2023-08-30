import express from "express";
import { CartModel } from "../models/Cart.js";
import { ProductModel } from "../models/Product.js";
import { EachCartModel } from "../models/EachCart.js";

const router = express.Router();

router.get("/show/:userID", async (req, res) => {
  const userID = req.params.userID;

  try {
    const cart = await EachCartModel.findOne({ userID });
    if (cart) {
      res.json({ cart });
    } else {
      res.json({ message: "No cart items found for the user." });
    }
  } catch (error) {
    res.json({ error: error.message });
  }

  // try {
  //   const cartItems = await CartModel.find({ userID }, { 'cartItems.productID': 1 });

  //   if (cartItems.length > 0) {
  //     const productIDs = cartItems.flatMap(cart => cart.cartItems.map(item => item.productID));

  //     // Retrieve product details for each productID from ProductModel
  //     const products = await ProductModel.find({ _id: { $in: productIDs } });

  //     res.json({ products });
  //   } else {
  //     res.json({ message: 'No cart items found for the user.' });
  //   }
  // } catch (error) {
  //   res.json({ error: error.message });
  // }
});

// router.get('/show/:userID', async (req, res) => {
//   const userID = req.params.userID;

//   try {
//     const cart = await CartModel.findOne({ userID });

//     if (cart) {
//       const cartItems = cart.cartItems.map(item => ({
//         productID: item.productID,
//         quantity: item.quantity
//       }));

//       const productIDs = cartItems.map(item => item.productID);

//       const products = await ProductModel.find({ _id: { $in: productIDs } });

// const mergedCartItems = cartItems.map(cartItem => {
//   const product = products.find(product => product._id.toString() === cartItem.productID);
//   return {
//     ...cartItem,
//     product
//   };
// });

//       res.json({ products ,cartItems});
//     } else {
//       res.json({ message: 'No cart items found for the user.' });
//     }
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// });

// router.post("/cartplus", async (req, res) => {
//   const userID = req.body.userID;
//   const productID = req.body.productID;
//   try {
//     const userCart = await EachCartModel.findOne({ userID });
//     if (userCart) {
//       const existingCartItem = userCart.cartItems.find(
//         (item) => item.productID.toString() === productID
//       );

//       if (existingCartItem) {
//         existingCartItem.quantity += quantity;
//         await userCart.save();

//         return res.json({ message: "Quantity increased." });
//       } else {
//         res.json({ message: "Quantity not Increaseable." });
//       }
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.post("/add", async (req, res) => {
  const { userID, cartItems } = req.body;
  const productID = cartItems.productID;
  const quantity = cartItems.quantity;

  try {
    // Fetch product details from ProductModel using productID
    const product = await ProductModel.findById(productID);

    if (!product) {
      return res.json({ message: "Product not found." });
    }

    const userCart = await EachCartModel.findOne({ userID });

    if (userCart) {
      const existingCartItem = userCart.cartItems.find(
        (item) => item.productID.toString() === productID
      );

      if (existingCartItem) {
        existingCartItem.quantity += quantity;
        await userCart.save();

        return res.json({ message: "Quantity increased." });
      } else {
        userCart.cartItems.push({
          productID,
          quantity,
          name: product.name,
          brand: product.brand,
          dressType: product.dressType,
          stock: product.stock,
          size: product.size,
          imageUrl: product.imageUrl,
          price: product.price,
          sellerID: product.sellerID,
        });

        await userCart.save();
        return res.json({ message: "Product added to cart." });
      }
    } else {
      const newCartItem = {
        productID,
        quantity,
        name: product.name,
        brand: product.brand,
        dressType: product.dressType,
        stock: product.stock,
        size: product.size,
        imageUrl: product.imageUrl,
        price: product.price,
        sellerID: product.sellerID,
      };

      const newCart = new EachCartModel({
        userID,
        cartItems: [newCartItem],
      });

      await newCart.save();
      return res
        .status(201)
        .json({ message: "Cart created and product added." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/delete", async (req, res) => {
  const { userID, cartItems } = req.body;
  const productID = cartItems.productID;
  const quantity = cartItems.quantity;
  try {
    const user = await EachCartModel.findOne({ userID });

    if (user) {
      const product = await EachCartModel.findOne({
        userID: user.userID, // Ensure the product is within the user's cart
        "cartItems.productID": productID,
      });

      if (product) {
        await EachCartModel.findOneAndUpdate(
          { userID, "cartItems.productID": productID }, // Update specific user's cart
          {
            $inc: { "cartItems.$.quantity": -quantity }, // Increment quantity
          }
        );

        res.json({ message: "success quantity decreased" });
      } else {
        await EachCartModel.findOneAndUpdate(
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
});

export { router as cartRouter };
