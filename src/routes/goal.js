// Routes require the following
// 1. Corresponding Controller
// 2. The Router from express

const router = require("express").Router()
const goalCtrl = require("../controllers/goal")


//-------------------------------------- Add new goal Routers -------------------------------------------
router.get("/add", goalCtrl.add_goal_get)
router.post("/", goalCtrl.add_goal_post)

// ------------------------------- Edit a goal Router ----------------------------------
router.get("/edit/:goalId", goalCtrl.edit_goal_get)
router.put("/:goalId", goalCtrl.edit_goal_put)

// ------------------------------------ DELETE  a goal Router ----------------------------------------------
router.delete("/", goalCtrl.delete_goal)

// ----------------------------------- Listing routers -----------------------------------
router.get("/", goalCtrl.listAll_goals_get) 
router.get("/:goalId", goalCtrl.listOne_goal_get)

// Exports
module.exports = router