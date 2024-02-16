import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).send({ error: "Unauthorized -No Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).send({ error: "Unauthorized -Invalid Token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }
    req.user = user;
    next();
    //end try
  } catch (error) {
    console.log("Error in protected route", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export default protectedRoute;
