const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    cart: {
        type: Array ,
        default : []
    }
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;