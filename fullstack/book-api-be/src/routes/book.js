const router = require("express").Router();
const {
  getAllBook,
  updateBook,
  deleteBook,
  createBook,
} = require("../controllers/book.js");
router.get("/", getAllBook);
router.post("/deleteBook", deleteBook);
router.post("/createBook", createBook);
router.post("/updateBook", updateBook);
module.exports = router;
