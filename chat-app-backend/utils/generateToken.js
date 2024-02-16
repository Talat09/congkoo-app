import Jwt from "jsonwebtoken";
const generateTokenAndSetCookie = (userId, res) => {
  const token = Jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, //mile seconds
    httpOnly: true, // prevet xss attacks cross-site scripting attacks
    sameSite: "strict", //CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
  //end
};
export default generateTokenAndSetCookie;
