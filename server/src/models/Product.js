import mongoose from 'mongoose';

const ProductsSchema= new mongoose.Schema({

    brand:{type: 'string'},
    name: { type: String, required: true },
    dressType:{type: String, required: true},
    stock: { type: String, required: true },
    size:{ type: String},
    imageUrl:{ type: String, required: true },
    price:{ type: String, required: true },
    sellerID:{type:mongoose.Schema.Types.ObjectId, ref:"users", required:true}

})

export const ProductModel = mongoose.model("product", ProductsSchema);
