import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import protect from "./middlewares/auth.middleware.js";
import userController from "./controllers/user.controller.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import proxyWithHeaders from "./utils/reqHeaders.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log("Gateway received:", req.method, req.originalUrl);
  next();
});
app.use("/api/auth", proxy(process.env.AUTH));
app.use("/api/chat", protect, proxyWithHeaders(process.env.CHAT));

app.use("/api/me", protect, userController);

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello" });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening at ${port}`);
});
