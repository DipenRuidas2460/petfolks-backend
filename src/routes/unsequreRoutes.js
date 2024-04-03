const express = require("express");

const router = express.Router();

const UserController = require("../controllers/UserController");
const { getFiles, getImage } = require("../helpers/fileHelper");

// ------------------------- Auth Routes -----------------------------------------------------------------------

router.post("/register", UserController.register);
router.post("/login", UserController.login);

// ------------------------- Photo and Files Routes -----------------------------------------------------------------------

router.get("/assets/files/:fileName", getFiles);
router.get("/assets/image/:fileName", getImage);

module.exports = router;
