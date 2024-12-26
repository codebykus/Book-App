const express = require("express");
const router = express.Router();
const {
  addReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");
const authValidation = require("../middlewares/authMiddleware");

router.post("/add", authValidation, addReview);

router.get("/:bookId", getReviews);

router.delete("/:reviewId", authValidation, deleteReview);

module.exports = router;
