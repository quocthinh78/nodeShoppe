var express = require("express");
var router = express.Router();
var orderController = require("../controllers/order")
router.post("/" , orderController.addOrder);

module.exports = router 