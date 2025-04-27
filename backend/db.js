import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username : String ,
    password : String ,
    firstName : String ,
    lastName : String 
});

export const userModel = mongoose.model("User" , userSchema);