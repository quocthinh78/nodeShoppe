var express = require("express");
var router = express.Router();
var orderController = require("../controllers/order")
router.post("/" , orderController.addOrder);
router.get("/" , orderController.getOrder)
module.exports = router 