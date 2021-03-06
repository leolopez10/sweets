const express = require("express");
const router = express.Router();
//controllers
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, read, update, purchaseHistory } = require("../controllers/user");

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
    console.log(req.profile);
    res.json({
        user: req.profile
    });
});

router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/:userId", requireSignin, isAuth, update);
router.get("/orders/by/user/:userId", requireSignin, isAuth, purchaseHistory);



//middleware for getting user by id above (user: req.profile)
router.param("userId", userById);



module.exports = router;