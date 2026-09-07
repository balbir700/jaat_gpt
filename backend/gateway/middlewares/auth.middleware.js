import redis from "../../shared/redis/redis.js";
const protect = async (req, res, next) => {
  try {
    console.log("Cookies:", req.cookies);

    const sessionId = req.cookies?.sessionId;

    console.log("Session ID:", sessionId);

    if (!sessionId) {
      console.log("❌ No session ID");
      return res.status(400).json({
        message: "user not logged in",
      });
    }

    const session = await redis.get(`sessionId-${sessionId}`);

    console.log("Redis session:", session);

    if (!session) {
      console.log("❌ Session not found in Redis");
      return res.status(400).json({
        message: "user session expired",
      });
    }

    req.user = JSON.parse(session);

    console.log("✅ User authenticated");

    next();
  } catch (error) {
    console.log("Protect error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export default protect;
