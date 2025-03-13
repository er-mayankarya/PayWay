import  express from "express";
import mongoose from "mongoose";
import zod from "zod";
import 'dotenv/config';
import { rootRouter } from "./routes/index.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());


app.use("/api/v1" , rootRouter)



app.listen(`${process.env.PORT}` , () => {
    console.log("Server is listening");
})