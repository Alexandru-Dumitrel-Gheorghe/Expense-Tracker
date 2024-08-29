// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// Configure CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "https://numele-tau-de-domeniu.com"], // Permite originile frontend-ului
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
const authRoutes = require("./routes/authRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const reportRoutes = require("./routes/reportRoutes");
const todoRoutes = require("./routes/todoRoutes");

app.use("/auth", authRoutes);
app.use("/budgets", budgetRoutes);
app.use("/transactions", transactionRoutes);
app.use("/reports", reportRoutes);
app.use("/todos", todoRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
