import mongoose from "mongoose";

const OrderSchema= new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
          },
          cartItems: [
            {
              productID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                
              },
              brand: { type: "string", ref: "product" },
              name: { type: String, ref: "product",  },
              dressType: { type: String, ref: "product",},
              stock: { type: String, ref: "product",  },
              size: { type: String, ref: "product" },
              imageUrl: { type: String, ref: "product",  },
              price: { type: String, ref: "product",  },
              
              quantity: { type: Number, default: 1 },
              price: { type: Number,  },
            },
          ],
          userAddress:[
            {
                addressLine1: { type: String,required: true},
                addressLine2: { type: String,},
                state:{type: String,required: true},
                city:{type: String,required: true},
                postalCode:{type: String,required: true},
            }
          ],
        //   payment:{type:Boolean},
        //   {timestamp: true,}

    }
);
export const OrderModel= mongoose.model('Order',OrderSchema);
