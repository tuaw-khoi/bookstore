const db = require("../models");
const updateInfor = async (req, res) => {
  try {
    const { informationId: id } = req.query;
    const { phoneNumber, address } = req.body;
    const information = await db.information.findByPk(id);

    if (!information) {
      return res
        .status(404)
        .json({ success: false, message: "Information not found" });
    }

    await information.update({
      phoneNumber: phoneNumber || information.phoneNumber,
      address: address || information.address,
    });

    return res.status(200).json({
      success: true,
      message: "Information updated successfully",
      data: information,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getAllInformation = async (req, res) => {
  res.status(200).json({
    message: "Get all success",
  });
};
module.exports = { updateInfor, getAllInformation };
