const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Încarcă variabilele de mediu din fișierul .env
dotenv.config();

const app = express();

// Middleware pentru CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Asigură-te că această origine este corectă
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware pentru parsarea corpului cererilor JSON
app.use(express.json());

// Conectează-te la MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Importă rutele definite în alte fișiere
const authRoutes = require("./routes/authRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

// Definește rutele API
app.use("/auth", authRoutes);
app.use("/budgets", budgetRoutes);
app.use("/transactions", transactionRoutes);

// Pornește serverul
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
