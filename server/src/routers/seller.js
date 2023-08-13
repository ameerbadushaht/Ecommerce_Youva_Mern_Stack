import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import _ from "lodash";
import { SellerModel } from "../models/Seller.js";

const router = express.Router();

// New Code for Register

router.post("/register", async (req, res) => {
  const { username,email, password } = req.body;
  //check already exist

  const seller = await SellerModel.findOne({ email });
  if (seller) {
    return res.json("Email already exists");
  } else {
    //create new
    const hashedPassword = await bcrypt.hash(password, 10);
    // const newSeller = new SellerModel(_.pick ([email, password]));

    const newSeller = new SellerModel({
      // email,password
      username,
      email,
      password: hashedPassword,
    });
    await newSeller.save();
    // res.send(_.pick(newSeller));

    res.json({ message: "seller registered successfully" });
  }
});

router.get("/check-email/:email", async (req, res) => {
  const { email } = req.params;
  const seller = await SellerModel.findOne({ email });

  if (seller) {
    res.json({ exists: true });
  } else {
    res.json({ exists: false });
  }
});
//Code for Login

router.post("/login", async (req, res) => {
  //check email exist
  const { email, password } = req.body;
  const seller = await SellerModel.findOne({ email });

  //No seller found
  if (!seller) {
    return res.json({ error: "seller not found" });
  }
  //seller found

  const isPasswordValid = await bcrypt.compare(password, seller.password);

  if (!isPasswordValid) {
    return res.json({ message: " password incorrect" });
  }

  const token = jwt.sign({ id: seller._id }, "secret");
  res.json({ token, userID: seller._id });
});

export { router as sellerRouter };

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "secret", (err) => {
      if (err) return res.status(403);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
