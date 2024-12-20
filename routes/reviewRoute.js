const express = require("express");
const router = express.Router();
const {
  addReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");
const authValidation = require("../middlewares/authValidation");

// Route to add a review
router.post("/add", authValidation, addReview);

// Route to get reviews for a book
router.get("/:bookId", getReviews);

// Route to delete a review
router.delete("/:reviewId", authValidation, deleteReview);

module.exports = router;
