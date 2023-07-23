import express from "express";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: "http://127.0.0.1:5173", // Replace this with the URL of your frontend
    credentials: true, // Allow credentials (cookies) to be sent by the frontend
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

app.listen(5175, () => {
  console.log("Connected to Backend");
});
