import mongoose from "mongoose";


const UserSchema= new mongoose.Schema({
    // fname:{ type: String, required: true},
    // lname:{ type: String},
    // username: { type: String, required: true, unique: true },
    email:{ type: String, required:true},
    password: { type: String, required: true }
    // wishlisted:[{ type: mongoose.Schema.Types.ObjectId, ref:"products" }],
})

export const UserModel = mongoose.model("users", UserSchema);
