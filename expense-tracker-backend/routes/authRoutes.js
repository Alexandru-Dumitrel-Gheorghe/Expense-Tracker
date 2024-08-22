const express = require("express");
const {
  registerUser,
  loginUser,
  resetPasswordRequest,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Ruta pentru a cere resetarea parolei
router.post("/reset-password-request", resetPasswordRequest);

// Ruta pentru a reseta efectiv parola
router.post("/reset-password", resetPassword);

module.exports = router;
