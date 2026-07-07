import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pdfRoutes from "./routes/pdfRoutes.js";
import { allRoutes } from "./route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
// app.use("/api/pdf", pdfRoutes);
allRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
