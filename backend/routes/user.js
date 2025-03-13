import { Router } from "express";
import mongoose from "mongoose";
import { User } from "../db.js";

export const userRouter = Router();

userRouter.post("/signup" , (req , res) => {
    const username = req.body;
    const password = req.body;
    const firstName = req.body;
    const lastName = req.body;

    User.create({
        username ,
        password,
        firstName,
        lastName
    })

    res.json({
        message : "Sihnup Sucessful"
    })
})

