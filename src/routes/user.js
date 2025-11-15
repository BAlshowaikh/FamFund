const router = require("express").Router()

//Load the Controller
const userProfileCtrl = require("../controllers/user")
router.get("/:userId", userProfileCtrl.getViewProfile)
router.put("/:userId", userProfileCtrl.putViewProfile)
module.exports = router
