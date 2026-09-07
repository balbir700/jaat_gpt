import express from "express";
import User from "../models/user.model.js";
import { getAuth } from "firebase-admin/auth";
import { firebaseApp } from "../config/firebase.js";
import redis from "../../../shared/redis/redis.js";

export const login = async (req, res) => {
  try {
    const token = req.body.token;
    const decoded = await getAuth(firebaseApp).verifyIdToken(token);
    let user = await User.findOne({
      fireBaseUid: decoded.uid,
    });
    if (!user) {
      user = await User.create({
        fireBaseUid: decoded.uid,
        name: decoded.name,
        avatar: decoded.picture,
        email: decoded.email,
      });
    }
    const sessionId = crypto.randomUUID();
    await redis.set(
      `sessionId-${sessionId}`,
      JSON.stringify({
        name: user.name,
        user_id: user.fireBaseUid,
        avatar: user.avatar,
        email: user.email,
      }),
      "EX",
      7 * 24 * 60 * 60,
    );
    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(user);
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const logout = async (req, res) => {
  try {
    const sessionId = req.cookies?.sessionId;
    redis.del(`sessionId-${sessionId}`);
    res.clearCookie("sessionId");
    return res.status(200).json({ message: "user logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: `error is ${error}` });
  }
};
