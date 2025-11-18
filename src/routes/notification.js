const router = require("express").Router()
const isAParent = require("../middleware/isAParent")

const notificationCtrl = require("../controllers/notification")

router.get("/:parentId",notificationCtrl.getNotificationIndexForParents)

module.exports = router
