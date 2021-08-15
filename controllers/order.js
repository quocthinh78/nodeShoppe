const User = require("../models/User");
const Order = require("../models/Order");

const addOrder = async (req , res) => {
    const {cart} = req.body;
    const user = await User.findById(req.body.id);
    let order;
    if(user.order === null) {
        order = await new Order({
            owner : user._id,
            cart : cart
        })
    }
    else {
        order = await Order.findById(user.order); 
        order.cart = cart;
    }
    await order.save();
    user.order = order._id;
    await user.save();
    res.json(user.order);
}

const getOrder = async (req, res) => {
    const {id} = req.body;
    const order = await Order.findOne({owner : id});
    res.json(order)
}
module.exports = {
    addOrder,
    getOrder
}