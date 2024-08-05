import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors"
import todoRoutes from "../src/routes/todoRoutes"
import connectDB from "./config/db";

dotenv.config();

connectDB()

const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json())
app.use(cors())

app.use('/api', todoRoutes)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Test" });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});