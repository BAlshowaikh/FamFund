const router = require("express").Router()
const isAParent = require("../middleware/isAParent")
const notificationCtrl = require("../controllers/notification")

router.get("/", isAParent, notificationCtrl.getNotificationIndexForParents)
router.get("/join-requests", isAParent, notificationCtrl.getJoinRequests)
router.put(
  "/join-requests/:id",
  isAParent,
  notificationCtrl.respondToJoinRequests
)

module.exports = router
