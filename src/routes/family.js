const family = require("../controllers/family")
const isAPrent = require("../middleware/isAParent")
const router = require("express").Router()
router.get("/join-request", family.getJoinRequests)

module.exports = router
