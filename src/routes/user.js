const router = require("express").Router()
//Load the Controller
const userProfileCtrl = require("../controllers/user")
const uploadProfileImage = require("../middleware/imageConverter/profile-Image")
router.get("/:userId", userProfileCtrl.getViewProfile)
router.put(
  "/:userId",
  uploadProfileImage.single("profileImage"),
  userProfileCtrl.putViewProfile
)
module.exports = router
