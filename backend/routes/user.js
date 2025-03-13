import { Router } from "express";
import mongoose from "mongoose";
import { User } from "../db.js";

export const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  await User.create({
    username,
    password,
    firstName,
    lastName,
  });

  res.json({
    message: "Sihnup Sucessful",
  });
});
