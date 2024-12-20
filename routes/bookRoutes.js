const express = require("express");
const router = express.Router();
const authValidation = require("../middlewares/authMiddleware");
const {
  addBook,
  getBooks,
  deleteBook,
} = require("../controllers/bookController");

router.post("/books", authValidation, addBook);
router.get("/books", authValidation, getBooks);
router.delete("/books/:id", authValidation, deleteBook);

module.exports = router;
