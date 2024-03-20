const db = require("../models");
const { Sequelize } = require("sequelize");
const createBook = async (req, res) => {
  try {
    console.log(req.url);
    const {
      title,
      genre,
      price,
      description,
      published_year,
      stock_quantity,
      imgUrl,
      author,
    } = req.body;
    const book = db.book.create({
      title,
      genre,
      price,
      description,
      published_year,
      stock_quantity,
      imgUrl,
      author,
    });
    return res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.log(error);
  }
};
const getAllBook = async (req, res) => {
  try {
    const books = await db.book.findAll();

    return res.status(200).json({
      data: books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const deleteBook = async (req, res) => {
  try {
    const { bookIds } = req.body;

    await db.book.destroy({
      where: {
        id: { [Sequelize.Op.in]: bookIds },
      },
    });

    return res
      .status(200)
      .json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
const updateBook = async (req, res) => {
  try {
    const { bookId: id } = req.query;
    const {
      title,
      genre,
      price,
      description,
      published_year,
      stock_quantity,
      imgUrl,
      author,
    } = req.body;
    const book = await db.book.findByPk(id);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    await book.update({
      title: title || book.title,
      genre: genre || book.genre,
      price: price || book.price,
      description: description || book.description,
      published_year: published_year || book.published_year,
      stock_quantity: stock_quantity || book.stock_quantity,
      imgUrl: imgUrl || book.imgUrl,
      author: author || book.author,
    });

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
module.exports = { updateBook, createBook, deleteBook, getAllBook };
