const express = require("express");
const router = express.Router();
const db = require("../db");

// Simple route to get current user role
router.get("/me", (req, res) => {
  res.json({ username: req.user.username, role: req.user.role });
});

module.exports = router;