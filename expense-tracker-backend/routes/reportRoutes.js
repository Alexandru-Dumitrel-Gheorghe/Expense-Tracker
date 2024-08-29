// routes/reportRoutes.js
const express = require("express");
const {
  exportTransactionsAsCSV,
  exportTransactionsAsPDF,
  getReport,
} = require("../controllers/reportController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Route to export transactions as CSV
router.get("/export/csv", authMiddleware, exportTransactionsAsCSV);

// Route to export transactions as PDF
router.get("/export/pdf", authMiddleware, exportTransactionsAsPDF);

// Route to get report data
router.get("/report", authMiddleware, getReport);

module.exports = router;
