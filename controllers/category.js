const Category = require("../models/Category");
const Product = require("../models/Product");

const createCat = async(req, res) => {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.json("success");
};

const getAllCat = async(req, res, next) => {
    const category = await Category.find({});
    res.json(category);
};

module.exports = {
    createCat,
    getAllCat,
};