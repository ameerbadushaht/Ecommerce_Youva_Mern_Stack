import express from 'express';
import { FavModel } from '../models/Favorite.js';
import { ProductModel } from '../models/Product.js';
import { UserModel } from '../models/Users.js';

const router = express.Router();
//test add fav


router.post('/add', async (req, res) => {
  const { userID, productID } = req.body;
try{
  const user = await UserModel.findById(userID);
  const product = await ProductModel.findById(productID);
  user.fav.push(product);
  await user.save();
  res.json({fav:user.fav})


}catch(err){
  res.json(err);
}

})

router.get('/fav', async (req, res) => {
  try{
    const user =await UserModel.findById(req.params.userID);
    res.json({fav: user?.fav});
  }catch(err){
    res.json(err);
  }
});

router.get('/saved/:userID', async (req, res) => {
  try{
    const user =await UserModel.findById(req.params.userID);
    const favorite = await ProductModel.find({
      _id:{ $in : user.fav },
    })
    
    res.json({favorite});
  }catch(err){
    res.json(err);
  }
});

export  {router as favRouter};
