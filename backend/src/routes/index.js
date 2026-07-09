import pdfRoutes from "./pdfRoutes.js";

export const allRoutes = (app) => {
  app.use("/api/pdf", pdfRoutes);
};
