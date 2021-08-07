const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const register = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const passwordhash = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: passwordhash
    })
    const result = await user.save();
    const { password, ...data } = result.toJSON();
    res.send(data)
}

const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(404).send({ message: "Khong tim thay nguoi dung" })
    }
    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send({ message: "Mat khau khong hop le" });
    }
    const token = jwt.sign({ id: user._id }, "secret")
    res.cookie("jwt", token, {
        httpOnly: true
    })
    res.send({ "message": "success" })
}
const logout = async (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.send({ message: "success" })
}

const getUser = async (req, res) => {
    try {
        const cookie = req.cookies['jwt']
        const claims = await jwt.verify(cookie, "secret");
        if (!claims) {
            return res.status(401).send({ message: "unauthentication" })
        }
        const user = await User.findOne({ _id: claims.id })
        const { password, ...data } = user.toJSON();
        res.send(data)
    } catch (e) {
        return res.status(401).send({ message: "unauthentication" })
    }
}

module.exports = {
    register,
    login,
    logout,
    getUser
};