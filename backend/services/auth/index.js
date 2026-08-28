import express from "express";
import dbConnect from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.get("/", (req, res) => {
  res.status(200).json({ message: "hello from auth" });
});
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening at ${port}`);
  dbConnect();
});
