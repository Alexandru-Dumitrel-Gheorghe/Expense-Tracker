const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from .env file
dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://expense-tracker-chi-pink.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const todoRoutes = require("./routes/todoRoutes");

app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);
app.use("/todos", todoRoutes);

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
