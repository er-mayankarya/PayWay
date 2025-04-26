import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import "dotenv/config";
import { rootRouter } from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express());

app.use("/api/v1" , rootRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

async function main() {
  mongoose.connect(`${process.env.MONGO_URI}/PayWay-Paytm_Clone`);
  console.log("Database Connected");

  app.listen(process.env.PORT, () => {
    console.log(`Server is listening at PORT ${process.env.PORT}`);
  });
}

main();
