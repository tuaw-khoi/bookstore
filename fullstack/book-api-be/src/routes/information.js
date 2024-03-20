const router = require("express").Router();
const {
  updateInfor,
  getAllInformation,
} = require("../controllers/information.js");
router.get("/", getAllInformation);
router.post("/updateInfor", updateInfor);
module.exports = router;
