// Dependencies 
const financialCoachCtrl = require("../controllers/financialCoach")
const router = require("express").Router()

// --------------- APIs -----------------------
router.post("/chat", financialCoachCtrl.reply_user_get)

// EXports 
module.exports = router