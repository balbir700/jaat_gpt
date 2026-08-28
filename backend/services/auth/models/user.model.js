import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fireBaseUid: { type: String, unique: true },
    name: String,
    email: String,
    avatar: String,
  },
  {
    TimeStamps: true,
  },
);

export const User = mongoose.model("User", userSchema);
