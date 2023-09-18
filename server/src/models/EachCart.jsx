import mongoose from "mongoose";

const EachCartSchema = new mongoose.Schema(
  {
    cartItems: [
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        brand: { type: "string", ref: "product" },
        name: { type: String, ref: "product", required: true },
        dressType: { type: String, ref: "product", required: true },
        stock: { type: String, ref: "product", required: true },
        size: { type: String, ref: "product" },
        imageUrl: { type: String, ref: "product", required: true },
        price: { type: String, ref: "product", required: true },
        sellerID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
      },
    ],
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamp: true }
);

export const EachCartModel = mongoose.model("Eachcart", EachCartSchema);
