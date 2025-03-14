import { Router } from "express";
import mongoose from "mongoose";
import { User } from "../db.js";
import jwt from "jsonwebtoken";
import { JWT_USER_SECRET } from "../config.js";

export const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const { username , password , firstName , lastName } = req.body;

  await User.create({
    username,
    password,
    firstName,
    lastName,
  });

  res.json({
    message: "Signup Sucessfull",
  });
});

userRouter.post("/signin" , async ( req , res ) => {
  const { username , password  } = req.body;

  const user = await User.findOne({
    username
  })

  if (!user) {
    res.status(403).send({
      message : "User doesn't exist"
    })
  }

  if (user) {
    const token = jwt.sign({
      id : user._id.toString()
    } , JWT_USER_SECRET)

    res.header("token" , token);
   
    res.json({
      message : "You are logged in" ,
      token
    })
  }else{
    res.status(401).json({
      message : "Incorrect Credential"
    })
  }
})
