const express = require("express");
const {
  registerUser,
  loginUser,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();

// Definește rutele și callback-urile lor
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/reset-password", resetPassword); // Verifică dacă această funcție există în controller

module.exports = router;
