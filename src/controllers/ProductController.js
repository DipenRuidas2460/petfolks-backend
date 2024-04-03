const moment = require("moment");
const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const { productName, category, description, specification, price, weight } =
      req.body;

    const currentDate = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD, HH:mm:ss");

    const obj = {
      productName,
      price,
      category,
      description,
      specification,
      weight,
      createdAt: currentDate,
    };

    await Product.create(obj)
      .then((productData) => {
        return res.status(201).json({
          status: 200,
          data: productData,
          message: "Product successfully created!",
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

const fetchAllProduct = async (req, res) => {
  try {
    const { page, pageSize, filterInput } = req.body;
    const filter = {};
    if (filterInput) {
      filter.productName = {
        [Op.like]: `%${filterInput}%`,
      };
    }

    await Product.findAndCountAll({
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

const fetchProductByProductId = async (req, res) => {
  try {
    await Product.findOne({ where: { id: req.params.productId } })
      .then((data) => {
        return res.status(200).json({
          status: 200,
          data,
          message: "product fetch successfully!",
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

const updateProduct = async (req, res) => {
  try {
    const updatedData = {};

    if (req.body.productName) {
      updatedData.productName = req.body.productName;
    }

    if (req.body.category) {
      updatedData.category = req.body.category;
    }

    if (req.body.description) {
      updatedData.description = req.body.description;
    }

    if (req.body.specification) {
      updatedData.specification = req.body.specification;
    }

    if (req.body.price) {
      updatedData.price = req.body.price;
    }

    if (req.body.weight) {
      updatedData.weight = req.body.weight;
    }

    if (Object.keys(obj).length > 0) {
      obj.updatedAt = moment()
        .tz("Asia/Kolkata")
        .format("YYYY-MM-DD, HH:mm:ss");
    }

    await Product.update(obj, { where: { id: req.params.productId } })
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

const deleteProduct = async (req, res) => {
  try {
    await Product.findOne({ where: { id: req.params.productId } })
      .then(async (data) => {
        if (data) {
          await Product.destroy({
            where: { id: req.params.productId },
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
  createProduct,
  fetchAllProduct,
  fetchProductByProductId,
  updateProduct,
  deleteProduct,
};
