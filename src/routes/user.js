const router = require("express").Router()
const isAUser = require("../middleware/isAUser")
//Load the Controller
const userProfileCtrl = require("../controllers/user")
const uploadProfileImage = require("../middleware/imageConverter/profile-Image")
router.get("/:userId", userProfileCtrl.getViewProfile)
router.put(
  "/:userId",
  uploadProfileImage.single("profileImage"),
  isAUser,
  userProfileCtrl.putViewProfile
)
module.exports = router
