const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, bookController.addBook);
router.get("/getbooks", authMiddleware, bookController.getBooks);
router.delete("/:id", authMiddleware, bookController.deleteBook);

module.exports = router;
