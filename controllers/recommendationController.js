const Recommendation = require("../models/Recommendation");

// Add a recommendation
exports.addRecommendation = async (req, res) => {
  try {
    const { bookId, message } = req.body;
    const userId = req.user._id; // Authenticated user ID

    const newRecommendation = new Recommendation({
      bookId,
      userId,
      message,
    });

    await newRecommendation.save();

    res.status(201).json({
      message: "Recommendation added successfully",
      recommendation: newRecommendation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding recommendation",
      error: error.message,
    });
  }
};

// Get all recommendations
exports.getRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find()
      .populate("bookId", "title author") // Include book title and author
      .populate("userId", "name email"); // Include user name and email

    res.status(200).json({
      message: "Recommendations retrieved successfully",
      recommendations,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving recommendations",
      error: error.message,
    });
  }
};
