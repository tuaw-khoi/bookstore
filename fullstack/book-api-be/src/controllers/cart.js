const db = require("../models");
const { Sequelize } = require("sequelize");

const addBookToCart = async (req, res) => {
  try {
    const { cartId, bookId, quantity } = req.body; // Lấy cartId và bookId từ request body

    // Kiểm tra xem giỏ hàng và cuốn sách có tồn tại không
    const cart = await db.cart.findByPk(cartId);
    const book = await db.book.findByPk(bookId);

    if (!cart || !book) {
      return res
        .status(404)
        .json({ success: false, message: "Cart or book not found" });
    }

    // Kiểm tra xem cuốn sách đã có trong giỏ hàng hay chưa
    let cartBook = await db.CartBook.findOne({
      where: {
        cartId: cartId,
        bookId: bookId,
      },
    });

    if (cartBook) {
      // Nếu đã có, cập nhật số lượng và giá
      cartBook.quantity += quantity;
      cartBook.totalPrice += book.price * quantity;
      await cartBook.save();
    } else {
      // Nếu chưa có, tạo một bản ghi mới
      cartBook = await db.CartBook.create({
        cartId: cartId,
        bookId: bookId,
        quantity: quantity,
        totalPrice: book.price * quantity,
      });
    }

    res.status(201).json({
      success: true,
      message: "Book added to cart successfully",
      cartBook,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

const getAllItem = async (req, res) => {
  try {
    const { UserId } = req.query; // Lấy userId từ tham số URL
    const carts = await db.cart.findAll({
      where: {
        UserId: UserId, // Điều kiện tìm kiếm theo UserId
      },
      include: {
        model: db.book,
        through: { attributes: [] },
      },
    });

    return res.status(200).json({
      success: true,
      data: carts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const deleteItem = async (req, res) => {
  try {
    const { UserId, bookIds } = req.body;
    const cart = await db.cart.findOne({
      where: {
        UserId: UserId,
      },
    });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "User's cart not found" });
    }

    await db.CartBook.destroy({
      where: {
        cartId: cart.id,
        bookId: { [Sequelize.Op.in]: bookIds },
      },
    });

    return res
      .status(200)
      .json({ success: true, message: "Book deleted from cart successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
module.exports = { addBookToCart, deleteItem, getAllItem };
