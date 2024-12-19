const Book = require("../models/Book");

// Add a book
const addBook = async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;
    const userId = req.user.id;

    const book = new Book({ title, author, genre, description, userId });
    await book.save();

    res.status(201).json({ message: "Book added!", book });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get all books
const getBooks = async (req, res) => {
  try {
    const userId = req.user.id;
    const books = await Book.find({ userId });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.user.id;

    const book = await Book.findOneAndDelete({ _id: bookId, userId });
    if (!book) {
      return res.status(404).json({ message: "Book not found!" });
    }

    res.status(200).json({ message: "Book deleted!" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
module.exports = {
  addBook,
  getBooks,
  deleteBook,
};
