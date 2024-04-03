const express = require("express");

const router = express.Router();

const UserController = require("../controllers/UserController");
const ChatController = require("../controllers/ChatController");
const MessageController = require("../controllers/MessageController");
const ProductController = require("../controllers/ProductController");
const OrderController = require("../controllers/OrderController");

// ------------------------- User Routes -----------------------------------------------------------------------

router.post("/user/all", UserController.getAllUsersByQuery);

// ------------------------- Chat Routes -----------------------------------------------------------------------

router.post("/chat", ChatController.accessChat);
router.get("/chat", ChatController.fetchChats);

// ------------------------- Message Routes --------------------------------------------------------------------

router.post("/message", MessageController.sendMessage);
router.get("/message/:chatId", MessageController.allMessages);

// ------------------------- Product Routes -----------------------------------------------------------------------

router.post("/product/create", ProductController.createProduct);
router.post("/product/all", ProductController.fetchAllProduct);
router.get("/product/:productId", ProductController.fetchProductByProductId);
router.put("/product/:productId", ProductController.updateProduct);
router.delete("/product/:productId", ProductController.deleteProduct);

// ------------------------- Order Routes --------------------------------------------------------------------

router.post("/order/create", OrderController.createOrder);
router.post("/order/all", OrderController.fetchAllOrder);
router.get("/order/:orderId", OrderController.fetchOrderByOrderId);
router.put("/order/:orderId", OrderController.updateOrder);
router.delete("/order/:orderId", OrderController.deleteOrder);

module.exports = router;