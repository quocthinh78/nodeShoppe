var express = require("express");
var router = express.Router();

const categoryController = require("../controllers/category");
// const productController = require("../controllers/product");

router.post("/", categoryController.createCat);
router.get("/", categoryController.getAllCat);
module.exports = router;