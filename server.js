import express from "express";
import { connectDB } from "./utils/db.js";
const app = express();
import todoRoutes from "./routes/todoRoutes.js"
import { errorHandler } from "./middleware/errorMiddleware.js";
import "./utils/constants.js";

const port = process.env.PORT || global.port;;

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/todo", todoRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});