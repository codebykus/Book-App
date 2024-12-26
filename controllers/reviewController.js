const Review = require("../models/Review");
const Book = require("../models/Book");
const User = require("../models/User");

// Add a review
exports.addReview = async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;

    // Check if the book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Create a new review
    const review = new Review({
      bookId,
      userId: req.user._id, // The user ID from the auth middleware
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
};

// Get all reviews for a specific book
exports.getReviews = async (req, res) => {
  try {
    const { bookId } = req.params;

    // Find reviews
    const reviews = await Review.find({ bookId })
      .populate("userId", "name email") // Populate user details in the review
      .exec();

    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this book" });
    }

    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Find the review by ID
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    //  user can only delete their own review
    if (review.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can only delete your own reviews" });
    }

    await review.remove();

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
};
