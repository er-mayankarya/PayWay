import mongoose, { Schema, Types } from "mongoose";

//User Schema & Model
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 50,
  },
});

export const userModel = mongoose.model("User", userSchema);

//Account Schema & Model
const accountSchema = new Schema({
    userId: {
      type: Types.ObjectId,
      ref: userModel,
      required: true,
    },
  
    balance: {
      type: Number,
      required: true,
    },
  });
  
  export const accountModel = mongoose.model("Account", accountSchema);