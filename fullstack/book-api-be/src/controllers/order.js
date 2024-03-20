const db = require("../models");
const { Sequelize } = require("sequelize");
const createOrder = async (req, res) => {
  try {
    const { UserId, cartBookId, totalAmount, payment_method, notes } = req.body;

    const user = await db.User.findByPk(UserId);
    const userInfor = await db.information.findByPk(user.informationId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Tìm sách trong giỏ hàng dựa trên cartBookId và UserId
    const cartBooks = await db.CartBook.findAll({
      where: {
        cartId: user.cartId,
        bookId: { [Sequelize.Op.in]: cartBookId }, // Điều kiện tìm kiếm theo cartBookId
      },
    });

    if (!cartBooks || cartBooks.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Cart items not found" });
    }

    // Tạo đơn hàng mới
    const order = await db.Order.create({
      customeName: user.fullName,
      phoneNumber: userInfor.phoneNumber,
      totalAmount: totalAmount,
      status: "Wait",
      payment_method: payment_method,
      shipping_address: userInfor.address,
      notes: notes,
    });

    // Thêm các sản phẩm vào chi tiết đơn hàng
    await Promise.all(
      cartBooks.map(async (cartBook) => {
        await db.OrderDetail.create({
          OrderId: order.id,
          productId: cartBook.bookId,
          quantity: cartBook.quantity,
        });
      })
    );
    await db.CartBook.destroy({
      where: {
        cartId: user.cartId,
        bookId: cartBook.bookId,
      },
    });

    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("Error creating order:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getOrderDetail = async (req, res) => {
  try {
    const { OrderId } = req.body;
    if (!OrderId) {
      return res.status(400).json({
        err: 1,
        msg: "Order details not found !",
      });
    }

    const ordersDetail = await db.OrderDetail.findAll({
      where: {
        OrderId: OrderId,
      },
    });

    return res.status(200).json({
      success: true,
      data: ordersDetail,
    });
  } catch (error) {
    console.error("Error getting all orders detail:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const orders = await db.Order.findAll();

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error getting all orders:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { OrderId } = req.query;
    const order = await db.Order.findByPk(OrderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    await db.OrderDetail.destroy({
      where: {
        OrderId: order.id,
      },
    });

    await order.destroy();

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const {
      customeName,
      phoneNumber,
      totalAmount,
      status,
      payment_method,
      shipping_address,
      notes,
    } = req.body;

    const order = await db.Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await order.update({
      customeName: customeName || order.customeName,
      phoneNumber: phoneNumber || order.phoneNumber,
      totalAmount: totalAmount || order.totalAmount,
      status: status || order.status,
      payment_method: payment_method || order.payment_method,
      shipping_address: shipping_address || order.shipping_address,
      notes: notes || order.notes,
    });

    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  updateOrder,
  createOrder,
  deleteOrder,
  getAllOrder,
  getOrderDetail,
};
