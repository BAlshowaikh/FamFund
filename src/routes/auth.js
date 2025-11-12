//Load the router
const router = require("express").Router()
//Load the Controller
const authCtrl = require("../controllers/auth")
//API's
router.get("/sign-up", authCtrl.get_signup)
router.post("/sign-up", authCtrl.post_signup)
router.post("/sign-up/parent", authCtrl.post_signup_parent)

module.exports = router
