import express from "express";
import dotenv from "dotenv";

import cors from "cors";
import { allRoutes } from "./routes/index.js";

const app = express();
dotenv.config();
console.log("object", process.env.GEMINI_API_KEY, process.env.PORT)
app.use(cors());
app.use(express.json());

allRoutes(app);

export default app;
