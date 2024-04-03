const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const { productId, date, status, totalPrice, paymentStatus } = req.body;

    const currentDate = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD, HH:mm:ss");

    const obj = {
      productId,
      date,
      status,
      totalPrice,
      paymentStatus,
      createdAt: currentDate,
    };

    await Order.create(obj)
      .then((orderData) => {
        return res.status(201).json({
          status: 200,
          data: orderData,
          message: "Order successfully created!",
        });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(200)
          .json({ status: 400, message: "An Error Occured!" });
      });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      status: 500,
      message: "Internal Server Error",
      data: err,
    });
  }
};

const fetchAllOrder = async (req, res) => {
  try {
    const { page, pageSize, productId, userId } = req.body;

    const filter = {};

    if (productId) {
      filter.productId = productId;
    }

    if (userId) {
      filter.userId = userId;
    }

    await Order.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: Number(pageSize),
      where: filter,
    })
      .then(({ count, rows }) => {
        return res.status(200).json({
          status: 200,
          data: rows,
          pagination: {
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: page,
            pageSize: pageSize,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(200)
          .json({ status: 400, message: "An Error Occured!" });
      });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      status: 500,
      message: "Internal Server Error",
      data: err,
    });
  }
};

const fetchOrderByOrderId = async (req, res) => {
  try {
    await Order.findOne({ where: { id: req.params.orderId } })
      .then((data) => {
        return res.status(200).json({
          status: 200,
          data,
          message: "Order fetch successfully!",
        });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(200)
          .json({ status: 400, message: "An Error Occured!" });
      });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      status: 500,
      message: "Internal Server Error",
      data: err,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const updatedData = {};

    if (req.body.date) {
      updatedData.date = req.body.date;
    }

    if (req.body.status) {
      updatedData.status = req.body.status;
    }

    if (req.body.totalPrice) {
      updatedData.totalPrice = req.body.totalPrice;
    }

    if (req.body.paymentStatus) {
      updatedData.paymentStatus = req.body.paymentStatus;
    }

    if (Object.keys(obj).length > 0) {
      obj.updatedAt = moment()
        .tz("Asia/Kolkata")
        .format("YYYY-MM-DD, HH:mm:ss");
    }

    await Order.update(obj, { where: { id: req.params.orderId } })
      .then((response) => {
        return res.status(200).json({
          status: response[0] === 0 ? 203 : 200,
          message:
            response[0] === 0 ? "No Changes made!" : "Successfully Updated!",
        });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(200)
          .json({ status: 400, message: "An Error Occured!" });
      });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      status: 500,
      message: "Internal Server Error",
      data: err,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    await Order.findOne({ where: { id: req.params.orderId } })
      .then(async (data) => {
        if (data) {
          await Order.destroy({
            where: { id: req.params.orderId },
          });

          return res.status(200).json({
            status: 200,
            message: "Data deleted successfully!",
          });
        } else {
          return res
            .status(200)
            .json({ status: 404, message: "Data not found!" });
        }
      })

      .catch((err) => {
        console.log(err);
        return res
          .status(200)
          .json({ status: 400, message: "An Error Occured!" });
      });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ status: 500, message: "Internal Server Error" });
  }
};

module.exports = {
  createOrder,
  deleteOrder,
  updateOrder,
  fetchAllOrder,
  fetchOrderByOrderId,
};
