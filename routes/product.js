var express = require("express");
var router = express.Router();

// const categoryController = require("../controllers/category");
const productController = require("../controllers/product");

router.get("/", productController.getAllProduct);
router.post("/", productController.createProduct);
router.get("/search", productController.getSearchKey)
router.get("/pagination", productController.getPagination);
router.get("/category", productController.getCategory);
router.get("/:id", productController.getDetail);
router.get("/:id/breadcrumb", productController.getBreadcrumb);
module.exports = router;