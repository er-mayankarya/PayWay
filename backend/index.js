import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";

const app = express();

app.use(express());

app.get("/" , (req ,res) => {
    res.send("API Working");
})




async function main(){

    mongoose.connect(`${process.env.MONGO_URI}/PayWay-Paytm_Clone`);
    console.log("Database Connected");
    
    app.listen(process.env.PORT , () => {
        console.log(`Server is listening at PORT ${process.env.PORT}`);
    })
}

main();