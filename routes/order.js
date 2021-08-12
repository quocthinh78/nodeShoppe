var express = require("express");
var router = express.Router();
var orderController = require("../controllers/order")

router.get("/" ,() => {
    console.log("aaa")
})

module.exports = router 