import mongoose from "mongoose";


const CartSchema= new mongoose.Schema({

  
  cartItems:[{
    productID:{type:mongoose.Schema.Types.ObjectId, ref:"product", required:true},
    quantity:{type:Number,default:1},
    price:{type:Number, required:true},
  }
  ],
  userID:{type:mongoose.Schema.Types.ObjectId, ref:"users", required:true}
  
},{timestamp: true})

export const CartModel = mongoose.model("cart", CartSchema);
