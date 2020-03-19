const express = require("express");
const router = express.Router();
//controllers
const { signup, signin, signout, requireSignin } = require("../controllers/auth");
//validation
const { userSignupValidator } = require("../validators");


// router.post("/signup", signup)
router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

//temp route
router.get("/hello", requireSignin, (req, res) => {
    res.send("hello there");
});



module.exports = router;