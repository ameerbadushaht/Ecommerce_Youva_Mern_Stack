import express from 'express';
import { FavModel } from '../models/Favorite.js';
import { ProductModel } from '../models/Product.js';
import { UserModel } from '../models/Users.js';

const router = express.Router();

// Add a product to the user's favorites
// router.post('/add', async (req, res) => {
//   const { userID, productID } = req.body;
  
//   try {

//       const newFavorite = new FavModel(
//         { 
//           userID, productID 
//         }
//         );
//         await newFavorite.save();
//         res.json("Added to wishlist")

//     }
//  catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });



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










// router.get('/show',async(req, res)=>{
//   try {


//     const favProduct = await FavModel.find({});
//     if(favProduct){
//       res.json(favProduct);


//     }
    
// } catch (error) {
//     res.json({ error: error.message });
// }
// })










// router.get('/show', async (req, res) => {
//   try {
//     const favProducts = await FavModel.find({}, { userID: 1, _id: 0 }); // Projection to include only userID field
//     if (favProducts.length > 0) {
//       const userIDs = favProducts.map((favProduct) => favProduct.userID);

//       // Find products based on userIDs
//       const products = await ProductModel.find({ userID: { $in: userIDs } });

//       res.json(products);
//     } else {
//       res.status(404).json({ message: 'No favorite products found.' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


export  {router as favRouter};