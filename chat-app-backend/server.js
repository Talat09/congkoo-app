//package
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
//file

import connectToDB from "./db/connectToMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
//import kora hoise
import { app, server } from "./socket/socket.js";

//variables

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
//middleware
dotenv.config();
app.use(express.json()); //to parse the incoming request with JSON payloads(from req.body)
app.use(cors());
app.use(cookieParser()); //to parse the incoming request with cookies
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
// app.get("/", (req, res) => {
//   res.send("Api Running");
// });
app.use(express.static(path.join(__dirname, "/frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});
//server listen
server.listen(PORT, () => {
  connectToDB();
  console.log(`Server Running on port ${PORT} `);
});
