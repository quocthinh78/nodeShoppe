const User = require("../models/User");
const Order = require("../models/Order");

const addOrder = async (req , res) => {
    const cartItem = req.body;
    const user = await User.findById(req.body.id);
    cartList.push(cartItem);
    const order = await new Order({
        owner : user._id,
        cart : cartItem
    })
    await order.save();
    user.order = order._id;
    await user.save();
    res.json(user.order);
}



module.exports = {
    addOrder
}