// import express from "express";
// import multer from "multer";
// import { uploadPDF } from "../controllers/pdfController.js";

// const router = express.Router();

// // Store uploaded files inside uploads/
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },

//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({
//   storage,
// });

// export const pdfRoutes = (router) => {
//   router.route("/upload").post(upload.single("pdf"), uploadPDF);
// };

// export default router;
// ------------------------------------------------------------------------------
import express from "express";

import { uploadPDF, uploadPDFF } from "../controllers/pdfController.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

router.post("/upload", upload.single("pdf"), uploadPDFF);

export default router;