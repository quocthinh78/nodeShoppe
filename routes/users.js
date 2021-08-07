var express = require('express');
var router = express.Router();
const userController = require('../controllers/user')
/* GET users listing. */
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user", userController.getUser);
router.post("/logout", userController.logout)

module.exports = router;
