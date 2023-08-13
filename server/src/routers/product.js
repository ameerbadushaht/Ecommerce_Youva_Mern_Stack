
import express from 'express';

import { ProductModel } from '../models/Product.js';
const router = express.Router();

router.post('/create',async(req,res) => {
    const {name}=req.body;
    const product = await ProductModel.findOne({ name });
    if (product) {
      return res.json("This product already exists");
    } else {
    try {
        const {
            brand,
            name,
            dressType,
            stock,
            size,
            imageUrl,
            price,
            sellerID
        } = req.body;

        const newProduct = new ProductModel({
            brand,
            name,
            dressType,
            stock,
            size,
            imageUrl,
            price,
            sellerID
        });

        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);
    
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
})

router.get('/list', async (req, res) => {

    try {
        const savedProduct = await ProductModel.find({});
        res.json(savedProduct);
    } catch (error) {
        res.json({ error: error.message });
    }

})

router.get('/list/:userID', async (req, res) => {
    const userID = req.params.userID;
    
    try {
        const savedProducts = await ProductModel.find({ sellerID: userID });
        res.json(savedProducts);
    } catch (error) {
        res.json({ error: error.message });
    }
});



export default router;