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

    // Total goals
    const totalGoals = await Goal.find({ familyId: userFamilyId }).countDocuments()

    // Total active goals
    const totalActiveGoals = await Goal.find({ familyId: userFamilyId, status: "Active" }).countDocuments()

    // --- START: Calculate the total contributions ---

    // 1. Fetch all goal IDs for the family
    const goalIds = await Goal.find({ familyId: userFamilyId }, '_id').lean();
    const goalObjectIds = goalIds.map(goal => goal._id);
    
    let totalContribution = 0;

    // 2. Run Aggregation if goals exist
    if (goalObjectIds.length > 0) {
        const totalContributionResult = await Contribution.aggregate([
            // Match contributions linked to the family's goal IDs
            { $match: { goalId: { $in: goalObjectIds } } },
            // Group all matches and sum the 'amount' field
            { $group: { 
                _id: null, 
                totalAmount: { $sum: '$amount' } 
            }}
        ]);

        // 3. Extract the result
        if (totalContributionResult.length > 0) {
            totalContribution = totalContributionResult[0].totalAmount;
        }
    }
    // --- END: Calculate the total contributions ---


    // Pass the info to the view
    res.render("dashboard/dashboard.ejs", {
        familyMembers, 
        activeGoals, 
        totalActiveGoals,
        totalGoals, 
        totalContributions: totalContribution.toFixed(2),
        activePage:"dashboard"})
}