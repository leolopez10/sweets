const express = require("express");
const router = express.Router();
//controllers
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

//temp route
router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
    console.log(req.profile);
    res.json({
        user: req.profile
    });
});

//middleware for getting user by id above (user: req.profile)
router.param("userId", userById);



module.exports = router;