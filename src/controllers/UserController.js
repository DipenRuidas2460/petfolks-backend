const User = require("../models/User");
const moment = require("moment");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const expiresIn = "1y";
const secretKey = process.env.APPTOKEN;
const storeOtp = new Map();

function sendOtp(phone) {
  try {
    // when get an api for send otp via sms, using axios call for fetch api data and get otp
    // console.log(otp);
    return true;
  } catch (err) {
    console.log(err);
  }
}

const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const userData = await User.findOne({ where: { phone: phone } });
    return true;
  } catch (err) {
    console.log(err);
  }
};

const reSendOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    return true;
  } catch (err) {
    console.log(err);
  }
};

const register = async (req, res) => {
  try {
    const { name, phone } = req.body;

    const currentDateTime = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");

    if (phone != "") {
      const findPhoneNumber = await User.findOne({
        where: { phone: phone },
      });

      if (findPhoneNumber) {
        return res.status(200).json({
          status: 409,
          msg: "Phone Number is already present!",
        });
      }
    }

    const newData = {
      name,
      phone,
      createdAt: currentDateTime,
    };

    await User.create(newData)
      .then(async (userDetails) => {
        const { id, name, phone } = userDetails;

        const userInfo = {
          id,
          name,
          phone,
        };

        return res.status(201).json({
          status: 200,
          data: userInfo,
          message: "User Created Successfully!",
        });
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
      .json({ status: 500, message: "Internal Server Error!" });
  }
};

const login = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(200).json({
        status: 401,
        message: "Please Provide the correct phone!",
      });
    }

    const user = await User.findOne({ where: { phone: phone } });

    if (!user) {
      return res.status(200).json({
        status: 401,
        message: "Invalid Phone Number, Please Try Again!",
      });
    }

    const token = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: expiresIn,
    });

    const data = {
      id: user.id,
      name: user.name,
      phone: user.phone,
    };

    res.status(200).json({
      status: 200,
      token: token,
      userdata: data,
      message: "User Login Successfully",
    });
  } catch (error) {
    return res.status(200).json({ status: 500, message: error.message });
  }
};

const getAllUsersByQuery = async (req, res) => {
  try {
    const { page, pageSize } = req.body;
    const keyword = req.query.search
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${req.query.search}%` } },
            { email: { [Op.like]: `%${req.query.search}%` } },
          ],
        }
      : {};

    await User.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: Number(pageSize),
      where: {
        ...keyword,
        id: { [Op.not]: req.person.id },
      },
      attributes: ["id", "name"],
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
  } catch (error) {
    console.log(error.message);
    return res.status(200).json({
      status: 500,
      message: "Internal Server Error!",
      messageInfo: error,
    });
  }
};

module.exports = { register, login, getAllUsersByQuery };
