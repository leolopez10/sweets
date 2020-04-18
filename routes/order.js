const express = require("express");
const router = express.Router();
const { requireSignin, isAuth } = require("../controllers/auth");
const { decreaseQuantity } = require("../controllers/product");
const { userById, addOrderToUserHistory } = require("../controllers/user");
const { create } = require("../controllers/order");

router.post('/order/create/:userId', requireSignin, isAuth, addOrderToUserHistory, decreaseQuantity, create);



router.param("userId", userById);

module.exports = router