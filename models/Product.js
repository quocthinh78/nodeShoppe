const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String },
    price: { type: Number, default: 0 },
    image: { type: String, default: "" },
    discount: { type: Number, default: 0 },
    outstock: { type: Boolean, default: false },
    star: { type: Number, default: 0 },
    evalue: { type: Number, default: 0 },
    saled: { type: Number, default: 0 },
    national: { type: String, default: "Việt Nam" },
    status: { type: Boolean, default: true },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;