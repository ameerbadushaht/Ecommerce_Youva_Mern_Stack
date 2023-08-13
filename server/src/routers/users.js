import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import _ from "lodash";
import { UserModel } from "../models/Users.js";

const router = express.Router();

// New Code for Register

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  //check already exist

  const user = await UserModel.findOne({ email });
  if (user) {
    return res.json("Email already exists");
  } else {
    //create new
    const hashedPassword = await bcrypt.hash(password, 10);
    // const newUser = new UserModel(_.pick ([email, password]));

    const newUser = new UserModel({
      // email,password
      email,
      password: hashedPassword,
    });
    await newUser.save();
    // res.send(_.pick(newUser));

    res.json({ message: "user registered successfully" });
  }
});

router.get("/check-email/:email", async (req, res) => {
  const { email } = req.params;
  const user = await UserModel.findOne({ email });

  if (user) {
    res.json({ exists: true });
  } else {
    res.json({ exists: false });
  }
});
//Code for Login

router.post("/login", async (req, res) => {
  //check email exist
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  //No user found
  if (!user) {
    return res.json({ error: "user not found" });
  }
  //user found

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: " password incorrect" });
  }

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

export { router as userRouter };

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
