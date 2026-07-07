import express from "express";
import pdfRoutes from "./routes/pdfRoutes.js";

const router = express.Router();

router.use("/api/pdf", pdfRoutes );