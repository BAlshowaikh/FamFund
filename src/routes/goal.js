// Routes require the following
// 1. Corresponding Controller
// 2. The Router from express
// 3. Optional (if u have a MW)

const router = require("express").Router()
const goalCtrl = require("../controllers/goal")
const goalValidationMW = require("../middleware/goal/goalValidation")


//-------------------------------------- Add new goal Routers -------------------------------------------
router.get("/add", goalCtrl.add_goal_get)
router.post("/", goalValidationMW.validateAddGoal, goalCtrl.add_goal_post)

// ------------------------------- Edit a goal Router ----------------------------------
router.get("/:goalId/edit", goalCtrl.edit_goal_get)
router.put("/:goalId", goalValidationMW.validateEditGoal, goalCtrl.edit_goal_put)

// ------------------------------------ DELETE  a goal Router ----------------------------------------------
router.delete("/", goalCtrl.delete_goal)

// ----------------------- DUMMY ---------------------------
router.get("/seed-goals", goalCtrl.seedDummy_goals_get);
router.post("/add", goalCtrl.add_dummy_goal_post)

// ----------------------------------- Listing routers -----------------------------------
router.get("/", goalCtrl.listAll_goals_get) 
router.get("/:goalId", goalCtrl.listOne_goal_get)

// Exports
module.exports = router