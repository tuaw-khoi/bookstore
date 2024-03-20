const router = require("express").Router();
const {
  deleteItem,
  addBookToCart,
  getAllItem,
} = require("../controllers/cart.js");
router.get("/", getAllItem);
router.post("/deleteItem", deleteItem);
router.post("/addBookToCart", addBookToCart);
module.exports = router;
