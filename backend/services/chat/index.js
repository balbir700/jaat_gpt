import express from "express";
import dbConnect from "./config/db.js";
import dotenv from "dotenv";
import router from "./routes/chat.routes.js";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello from chat" });
});
app.use("/", router);
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening at ${port}`);
  dbConnect();
});
