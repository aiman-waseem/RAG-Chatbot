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

export const uploadPDFF = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "PDF is required",
            });
        }

        res.status(200).json({
            success: true,
            message: "PDF uploaded successfully",
            data: req.file,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};