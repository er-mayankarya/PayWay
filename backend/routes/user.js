import express, { Router } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../db.js";
import { JWT_USER_SECRET } from "../config.js";
import { authMiddleware } from "../middleware.js";

export const userRouter = Router();

// User Signup Endpoint -
userRouter.post("/signup", async (req, res) => {
  //TODO - ZOD Validataion
  //TODO - Hashing the Password using bcrypt library

  try {
    const { username, password, firstName, lastName } = req.body;

    const existingUser = await userModel.findOne({
      username: username,
    });

    if (existingUser) {
      res.status(411).send({
        message: "Email already use",
      });
    } else {
      const user = await userModel.create({
        username,
        password,
        firstName,
        lastName,
      });

      const token = jwt.sign(
        {
          userId: user._id,
        },
        JWT_USER_SECRET
      );

      res.header("token", token);

      res.json({
        message: "Account Created",
        token,
      });
    }
  } catch (error) {
    console.log(`Error : $${error}`);
  }
});

//User Signin Endpoint
userRouter.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({
      username,
      password,
    });

    if (user) {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        JWT_USER_SECRET
      );

      res.header("token", token);

      res.json({
        token,
      });
    } else {
      res.json({
        message: "Invalid Input Credinitals / User doesn't exist",
      });
    }
  } catch (error) {
    console.log(`Error : ${error}`);
  }
});


//User Update Information Endpoint
userRouter.put("/", authMiddleware, async (req, res) => {
  try {
    const { username, password, firstName, lastName } = req.body;

    await userModel.updateOne(
      { _id: req.userId },
      {
        username,
        password,
        firstName,
        lastName,
      }
    );

    res.json({
      message: "Updated Sucessful",
    });
  } catch (error) {
    console.log(`Error : ${error}`);
  }
});

//User filtering Endpoint -
userRouter.get("/bulk" , async (req , res) => {

  const filter = req.query.filter || "";

    const users = await userModel.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })

});