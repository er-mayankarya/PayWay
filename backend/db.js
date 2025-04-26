import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email : String ,
    password : String ,
    firstName : String ,
    lastName : String 
});

export const userModel = mongoose.model("User" , userSchema);