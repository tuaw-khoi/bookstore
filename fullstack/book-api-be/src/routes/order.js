const router = require("express").Router();
const Joi = require("joi");
const validateDto = require("../middlewares/validation.js");
const { string, stringReq } = require("../middlewares/joiSchema.js");
const {
  getAllOrder,
  deleteOrder,
  updateOrder,
  createOrder,
  getOrderDetail,
} = require("../controllers/order.js");
router.get("/", getAllOrder);
router.post("/deleteOrder", deleteOrder);
router.post("/createOrder", createOrder);
router.post("/updateOrder", updateOrder);
router.get("/getOrderDetail", getOrderDetail);
module.exports = router;
