const Product = require("../models/Product");
const Category = require("../models/Category");

const getAllProduct = async (req, res, next) => {
    const product = await Product.find({});
    res.send(product);
};

const createProduct = async (req, res, next) => {
    const product = req.body;
    const cat = await Category.findById(req.body.id);
    product.owner = cat._id;
    const newProduct = new Product(product);
    await newProduct.save();
    cat.products.push(newProduct._id);
    await cat.save();
    res.json(newProduct);
};

const getDetail = async (req, res) => {
    const { id } = req.params;
    const oneProduct = await Product.findById(id);
    res.send(oneProduct);
};
const getBreadcrumb = async (req, res) => {
    const { id } = req.params;
    const oneProduct = await Product.findById({ _id: id })
        .populate("owner")
        .exec();
    res.send(oneProduct);
};
const getSearchKey = async (req, res) => {
    const { name } = req.query;
    const data = await Product.find({ 'name': new RegExp(name, 'i') }).limit(4);
    res.send(data)
};
const getPagination = async (req, res) => {
    let { page, limit, cat } = req.query;
    if (page > 0) {
        let totalProduct;
        let products;
        if (cat) {
            totalProduct = await Product.find({ owner: cat });
            products = await Product.find({ owner: cat }).populate("owner").skip((page - 1) * 10).limit(10);
        }
        else {
            totalProduct = await Product.find({});
            products = await Product.find({}).populate("owner").skip((page - 1) * 10).limit(10);
        }
        const totalCount = totalProduct.length;
        page = parseInt(page);
        limit = parseInt(limit)
        const data = {
            products: products,
            pagination: { page, limit, totalCount }
        }
        res.send(data);
    }
}

const getCategory = async (req, res) => {
    const category = await Category.find({});
    res.send(category);
}
module.exports = {
    getAllProduct,
    createProduct,
    getDetail,
    getBreadcrumb,
    getSearchKey,
    getPagination,
    getCategory
};
// {
//     "id" : "610274214d3ba673d06f6778",
//     "name" : "[Trả góp 0%] Điện Thoại Samsung Galaxy A31 (6GB/128GB) - Hàng chính hãng Mới 100% Nguyên seal Bảo hành 12 tháng",
//     "image" : "https://laz-img-cdn.alicdn.com/tfs/TB1Yltkl4TpK1RjSZFKXXa2wXXa-720-720.png_340x340q80.jpg",
//     "price" : 4767000,
//     "discount" : 28,
//     "outstock" : false,
//     "start" : 4 ,
//     "evalue" : 4.7,
//     "saled" : 10080,
//     "national" : "Việt Nam",
//     "status" : true
//  }