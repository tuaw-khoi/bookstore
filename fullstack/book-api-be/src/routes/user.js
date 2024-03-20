const router = require("express").Router();
const Joi = require("joi");
const validateDto = require("../middlewares/validation.js");
const { string, stringReq } = require("../middlewares/joiSchema.js");
const {
  login,
  getAll,
  register,
  deleteUser,
} = require("../controllers/user.js");
router.get("/", getAll);
router.post(
  "/login",
  validateDto(Joi.object({ username: stringReq, password: stringReq })),
  login
);
router.post(
  "/register",
  validateDto(
    Joi.object({
      fullName: stringReq,
      password: stringReq,
      email: stringReq,
      username: stringReq,
    })
  ),
  register
);
router.post("/deleteUser", deleteUser);
module.exports = router;
