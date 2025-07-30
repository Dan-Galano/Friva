import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.mjs";
import authRoutes from "./routes/auth.route.mjs";
import messageRoutes from "./routes/message.route.mjs";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.mjs";

dotenv.config();

const PORT = process.env.PORT;

// using socket.io
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  connectDB();
});
