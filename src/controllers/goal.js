// Controllers require the following
// 1. Corresponding model 

const Goal = require("../models/Goal")

// -------------------------------------------CRUD--------------------------------

// ----------------------------------- Listing APIs -----------------------------------

// When clicked on "Goals" in the side bar
exports.listAll_goals_get = async (req, res) => {
    try{
        const goals = await Goal.find().sort({ "title": 1 })
        res.status(200).render("goals/index.ejs", {goals})
    } catch(error) {
        console.error("Error fetching goals:", error);
        res.status(500).render("error.ejs", {
            message: "Something went wrong while fetching the goals."
        })  
    }
}

// When a "View Details" button is clicked 
exports.listOne_goal_get = async (req, res) => {
    try{
    // Find the specified goal using the passed goal id 
    const goal = await Goal.findById(req.params.goalId)
    res.status(200).render("goal/details.ejs", {goal})
    } catch(error) {
        console.error("Error fetching goal:", error)
        res.status(500).render("error.ejs", {
            message: "Something went wrong while fetching the goal."
        })
    }
}


//-------------------------------------- Add new goal APIs -------------------------------------------


// When the "add" sign is clicked in the goal/index.ejs page (For parents only)
exports.add_goal_get = (req, res) => {
    try{
        res.status(200).render("goals/add.ejs")
    } catch(error) {
        console.error("Error rendering the page", error)
        res.status(500).render("error.ejs", {
            message: "Error while rendering the required file."
        })
    }
}

// When the save button is clicked inside the "goals/add.ejs" file
exports.add_goal_post = async (req, res) => {
    try{
        // Adding the required reference ids
        req.body.createdByUserId = req.session.user._id
        req.body.familyId = req.session.user.familyId

        const addedGoal = await Goal.create(req.body)

        // Redirect to the added goal's details page
        res.redirect(`/goals/${addedGoal._id}`)

    } catch(error) {
        console.error("Error  adding a new goal", error)
        res.status(500).render("error.ejs", {
            message: "Error while adding a new goal."
        })
    }
}

// ------------------------------- Edit a goal ----------------------------------

// When the "edit" icon is clicked in the goal/index.ejs page (For parents only)
exports.edit_goal_get = async (req, res) => {
    try{
        // Find the specified goal
        const goal = await Goal.findById(req.params.goalId)

        // If no goal found
        if (!goal) {
            return res.status(404).render("error.ejs", {
                message: "Goal not found."
            });
        }

        // If goal is found
        res.status(200).render("goals/edit.ejs", {goal})

    } catch(error) {
        console.error("Error rendering the page", error)
        res.status(500).render("error.ejs", {
            message: "Error while rendering the required file."
        })
    }
}

// When the save button is clicked inside the "goals/add.ejs" file
exports.edit_goal_put = async (req, res) => {
    try{
        // Find the specified goal
        const goal = await Goal.findById(req.params.goalId)

        // Adding the required reference ids
        req.body.createdByUserId = req.session.user._id
        req.body.familyId = req.session.user.familyId

        goal.set(req.body)

        // Redirect to the edited goal's details page
        res.redirect(`/goals/${addedGoal._id}`)

    } catch(error) {
        console.error("Error editing the goal", error)
        res.status(500).render("error.ejs", {
            message: "Error while editing the goal."
        })
    }
}


// ------------------------------------ DELETE  a goal ----------------------------------------------

// When the "trash" icon is clicked in the index.ejs page (Parent only)
exports.delete_goal = async (req, res) => {
    try{
        // Find the specified goal
        const goal = await Goal.findById(req.params.goalId).deleteOne()
    } catch (error){
        console.error("Error deleting the goal", error)
        res.status(500).render("error.ejs", {
            message: "Error while deleteing the goal."
        })
    }
}

