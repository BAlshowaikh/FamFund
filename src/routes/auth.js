//Load the router
const router = require("express").Router()
//Load the Controller
const authCtrl = require("../controllers/auth")
//API's
router.get("/sign-up", authCtrl.get_signup)
router.post("/sign-up", authCtrl.post_signup)
router.get("/sign-up/parent", authCtrl.get_signup_parent)
router.post("/sign-up/parent", authCtrl.post_signup_parent)
router.get("/sign-up/child", authCtrl.get_signup_child)
router.post("/sign-up/child", authCtrl.post_signup_child)
router.get("/sign-in", authCtrl.get_signin)
router.post("/sign-in", authCtrl.post_signin)
router.get("/sign-out", authCtrl.get_signout)
module.exports = router
