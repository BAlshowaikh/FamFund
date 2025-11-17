// Dependinces
const router = require("express").Router()
const dashboardCtrl = require("../controllers/dashboard")

// -------------------------- APIs ----------------------
router.get("/", dashboardCtrl.dashboard_all_get)

// Exports
module.exports = router