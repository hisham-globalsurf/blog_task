import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import commentRoutes from "./routes/comment.routes.js";
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = process.env.FRONTEND_URLS.split(",");
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.get("/home", (req, res) => {
  res.json("hi");
});

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/comment", commentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
