import  express from "express";
import mongoose from "mongoose";
import zod from "zod";
import 'dotenv/config';

const app = express();

app.get("/" , (req , res) => {
    res.send("Hello PayWAy...");
})

app.listen(`${process.env.PORT}` , () => {
    console.log("Server is listening");
})