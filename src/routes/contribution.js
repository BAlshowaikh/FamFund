// Routes require the following
// 1. Corresponding Controller
// 2. The Router from express

const router = require("express").Router()
const contCtrl = require("../controllers/contribution")

//-------------------------------------- Add new cont APIs -------------------------------------------
// router.get("/add", contCtrl.add_cont_get)
// router.post("/", contCtrl.add_cont_post)
router.post("/:goalId", contCtrl.dummy_add_contribution_post)


// ----------------------------------- Listing routers -----------------------------------
router.get("/", contCtrl.listAll_contribution_get) 
router.get("/:contId", contCtrl.listOne_contribution_get)

// Exports
module.exports = router
