import { extractPDFText } from "../services/pdfService.js";

export const uploadPDF = async (req, res) => {
  try {
    // File uploaded by Multer
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No PDF uploaded",
      });
    }

    const extractedText = await extractPDFText(file.path);

    res.status(200).json({
      success: true,
      fileName: file.originalname,
      textLength: extractedText.length,
      message: "PDF uploaded successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};