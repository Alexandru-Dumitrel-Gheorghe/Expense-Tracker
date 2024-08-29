// controllers/reportController.js
const Transaction = require("../models/Transaction");
const { Parser } = require("json2csv");
const PDFDocument = require("pdfkit");

// Export transactions as CSV
exports.exportTransactionsAsCSV = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });

    // Convert to CSV
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(transactions);

    // Set headers and send the CSV file
    res.header("Content-Type", "text/csv");
    res.attachment("transactions.csv");
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Export transactions as PDF
exports.exportTransactionsAsPDF = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });

    // Create a PDF document
    const doc = new PDFDocument();
    let filename = "transactions";
    filename = encodeURIComponent(filename) + ".pdf";

    // Setting response to download the PDF
    res.setHeader(
      "Content-disposition",
      'attachment; filename="' + filename + '"'
    );
    res.setHeader("Content-type", "application/pdf");

    doc.pipe(res);

    // Add title and some basic information
    doc.fontSize(25).text("Transactions Report", {
      align: "center",
    });

    doc.moveDown();

    // Loop through transactions and add them to the PDF
    transactions.forEach((transaction) => {
      doc
        .fontSize(12)
        .text(
          `Title: ${transaction.title}\nAmount: ${transaction.amount}\nCategory: ${transaction.category}\nType: ${transaction.type}\nDate: ${transaction.date}\n\n`,
          {
            width: 410,
            align: "left",
          }
        );
      doc.moveDown();
    });

    // Finalize the PDF and end the stream
    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Existing report generation function
exports.getReport = async (req, res) => {
  try {
    const reportData = await Transaction.aggregate([
      { $match: { user: req.user.id } }, // Match user's transactions
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
    ]);

    res.json(reportData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
