require("dotenv").config();
const secretKey = process.env.APPTOKEN;
const jwt = require("jsonwebtoken");

// For Validating User from Token
const validateToken = (token) => {
  try {
    if (!token) {
      return false;
    }

    token = token.split(" ")[1];
    const decodedToken = jwt.verify(token, secretKey);
    return decodedToken;
  } catch (error) {
    return false;
  }
};

const getDayName = (_date) => {
  const weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(_date);
  const dayIndex = date.getDay();
  return weekDay[dayIndex];
};

module.exports = {
  encryptPassword,
  checkPassword,
  validateToken,
  getDayName,
};
