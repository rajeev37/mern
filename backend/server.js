import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./utils/db.js";
const app = express();
import todoRoutes from "./routes/todoRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { errorHandler } from "./middleware/errorMiddleware.js";
import "./utils/constants.js";

const port = process.env.PORT || global.port;;

connectDB();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/todo", todoRoutes);
app.use("/api/user", userRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});