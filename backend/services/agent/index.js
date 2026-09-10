import express from "express";
import dbConnect from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello from agent" });
});
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening at ${port}`);
  dbConnect();
});
