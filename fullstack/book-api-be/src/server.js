const env = require("dotenv");
const cors = require("cors");
const express = require("express");
const dbconn = require("./config/dbconn.js");
const userRouter = require("./routes/user.js");
const bookRouter = require("./routes/book.js");
const cartRouter = require("./routes/cart.js");
const orderRouter = require("./routes/order.js");
const informationRouter = require("./routes/information.js");
const checkToken = require("./middlewares/verifyToken.js");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
checkToken;
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/book", bookRouter);
app.use("/order", orderRouter);
app.use("/information", informationRouter);
dbconn();
app.listen(3000, () => {
  console.log("server is running");
});
