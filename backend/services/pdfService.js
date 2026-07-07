// import fs from "fs";
// import { PDFParse } from 'pdf-parse';

// export const extractPDFText = async (filePath) => {
//   const dataBuffer = fs.readFileSync(filePath);

//   const pdfData = await PDFParse(dataBuffer);

//   return pdfData.text;
// };


import { PDFParse } from "pdf-parse";

export const extractPDFText = async (filePath) => {
  const parser = new PDFParse({
    url: filePath,
  });

  try {
    const result = await parser.getText();
    return result.text;
  } finally {
    await parser.destroy();
  }
};