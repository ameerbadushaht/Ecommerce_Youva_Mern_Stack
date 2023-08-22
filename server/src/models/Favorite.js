

import mongoose from "mongoose";


const FavSchema= new mongoose.Schema({
  userID: {
    type: String,
  },
  
  // products: [
  //   {
  //     productId: {
  //       type: String,
  //     }
      
  //   }
  // ],
  productID:{type: String}
})

export const FavModel = mongoose.model("favorite", FavSchema);
