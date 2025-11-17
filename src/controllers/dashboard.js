// Import required models
const User = require("../models/User")
const Goal = require("../models/Goal")
const Contribution = require("../models/Contribution")

// I'll need one controller that when the dashboard page is clicked this controller will send everything
exports.dashboard_all_get = async (req, res) => {
    // First retrieve the user's famliy info
    const userFamilyId = req.session.user.familyId
    const familyMembers = await User.find( { familyId: userFamilyId} )

    // Fetch the active goals of the user's family
    const activeGoals = await Goal.find({ familyId: userFamilyId, status: "Active" })

    // Calculate the total contributions


    // Pass the info to the view
    res.render("dashboard/dashboard.ejs", {familyMembers, activeGoals, activePage:"dashboard"})
}