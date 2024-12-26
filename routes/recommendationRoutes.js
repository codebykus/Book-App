const express = require("express");
const router = express.Router();
const {
  addRecommendation,
  getRecommendations,
} = require("../controllers/recommendationController");
const authValidation = require("../middlewares/authMiddleware");

router.post("/", authValidation, addRecommendation); // Add a recommendation
router.get("/", getRecommendations); // Get all recommendations

module.exports = router;
