import prisma from "../config/dbConnection.js";
import { createEmbedding } from "../services/embedding.service.js";
import { extractPDFText } from "../services/pdfService.js";
import { chunkText } from "../utils/chunkText.js";

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
      const embeddedChunks = [];
 console.log("HELLO AIMAN")

    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "PDF is required",
            });
        }
        const document = await prisma.document.create({
  data: {
    title: req.body.title || req.file.originalname,
    filename: req.file.filename,
  },
});
const text = await extractPDFText(req.file.path);
        const chunks = chunkText(text);

        for (const chunk of chunks) {
  const embedding = await createEmbedding(chunk);

  embeddedChunks.push({
    chunk,
    embedding,
  });
}
await prisma.documentChunk.createMany({
  data: embeddedChunks.map((item, index) => ({
    chunkText: item.chunk,
    embedding: item.embedding,
    chunkIndex: index,
    documentId: document.id,
  })),
});

       return res.status(200).json({
  success: true,
  documentId: document.id,
  totalChunks: embeddedChunks.length,
});
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};