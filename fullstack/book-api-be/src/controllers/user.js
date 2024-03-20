const db = require("../models");
var jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs !",
      });
    }

    // Tìm người dùng dựa trên tên đăng nhập
    const user = await db.User.findOne({
      where: { username: username },
    });

    // Kiểm tra xem người dùng có tồn tại không
    if (!user) {
      return res.status(400).json({
        err: 1,
        msg: "User not found !",
      });
    }

    // So sánh mật khẩu đã hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const userWithoutPassword = { ...user.toJSON() };
      delete userWithoutPassword.password;
      const token = jwt.sign(
        {
          data: user,
        },
        "secret",
        { expiresIn: "10h" }
      );
      return res.status(200).json({ token, user: userWithoutPassword });
    } else {
      return res.status(401).json({
        err: 1,
        msg: "Incorrect password !",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: 1,
      msg: "Internal server error",
    });
  }
};
const register = async (req, res) => {
  try {
    const { fullName, email, password, username, role } = req.body;

    // Kiểm tra xem tài khoản đã tồn tại chưa
    const existingUsername = await db.User.findOne({
      where: { username },
    });
    const existingEmail = await db.User.findOne({ where: { email } });
    if (existingUsername || existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    // Tiến hành tạo tài khoản mới
    const pass = hashPassword(password);
    const newUser = await db.User.create({
      fullName,
      email,
      password: pass,
      username,
      role,
    });
    const userWithoutPassword = { ...newUser.toJSON() };
    delete userWithoutPassword.password;

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const users = await db.User.findAll();

    return res.status(200).json({
      success: true,
      message: "Successfully retrieved all users",
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { UserIds } = req.body;
    if (!UserIds) {
      return res.status(400).json({
        err: 1,
        msg: "User not found !",
      });
    }

    await db.User.destroy({
      where: {
        id: { [Sequelize.Op.in]: UserIds },
      },
    });

    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
module.exports = { login, register, getAll, deleteUser };
