// Controllers require the following
// 1. Corresponding model 

const Goal = require("../models/Goal")

const Contribution = require("../models/Contribution") // Required for the delete

// For dummy data
const mongoose = require("mongoose")

// -------------------------------------------CRUD--------------------------------

// ----------------------------------- Listing APIs -----------------------------------


// When clicked on "Goals" in the side bar
exports.listAll_goals_get = async (req, res) => {
    const user = req.session.user
    const userFamilyId = user.familyId
    try{
        // Only show the goals associated to the user's family
        const goals = await Goal.find({ familyId:{ $eq: userFamilyId } }).sort({ "title": 1 })

        // If no goal found
        if (!goals) {
            return res.status(404).render("error.ejs", {
                message: "Goal not found.",
                activePage: "goals"
            });
        }

        res.status(200).render("goals/index.ejs", {
            title: 'Goals | FamFund', goals ,activePage: 'goals',
        })
        
    } catch(error) {
        console.error("Error fetching goals:", error);
        res.status(500).render("error.ejs", {
            message: "Something went wrong while fetching the goals.",
            activePage: "goals"
        })  
    }
}

// When a "View Details" button is clicked 
exports.listOne_goal_get = async (req, res) => {
    const user = req.session.user
    const userFamilyId = user.familyId

    try{
      // Find the specified goal using the passed goal id 
      const goal = await Goal.findOne({
       _id: req.params.goalId, 
      familyId: userFamilyId })

    
      // If no goal found
        if (!goal) {
            return res.status(404).render("error.ejs", {
                message: "Goal not found.",
                activePage: "goals"
            });
        }
    
    // Show all contributions done by the userfor this goal
    const contributions = await Contribution.find({
      goalId: req.params.goalId,
      contributorId: req.session.user._id
    })

    res.status(200).render("goals/details.ejs", {goal, contributions, activePage:"goals"})
    } catch(error) {
        console.error("Error fetching goal:", error)
        res.status(500).render("error.ejs", {
            message: "Something went wrong while fetching the goal.",
            activePage: "goals"
        })
    }
}


//-------------------------------------- Add new goal APIs -------------------------------------------


// When the "add" sign is clicked in the goal/index.ejs page (For parents only)
exports.add_goal_get = (req, res) => {
    try{
        res.status(200).render("goals/create.ejs", {activePage: "goals"})

    } catch(error) {
        console.error("Error rendering the page", error)
        res.status(500).render("error.ejs", {
            message: "Error while rendering the required file.",
            activePage: "goals"
        })
    }
}

// When the save button is clicked inside the "goals/add.ejs" file
exports.add_goal_post = async (req, res) => {

  const user = req.session.user
  const userFamilyId = user.familyId
  console.log(user)
    try{

      const coverImgURL = req.file ? `/public/images/goal-cover-images/${req.file.filename}` : undefined;

      // Adding the required reference ids
      const newGoalData = {
      title: req.body.title,
      description: req.body.description,
      targetAmount: req.body.targetAmount,
      currentAmount: req.body.currentAmount || 0,
      status: req.body.status || "Active",
      dueDate: req.body.dueDate || null,
      coverImgURL,
      familyId: userFamilyId,
      createdByUserId: user._id,
    };

      const addedGoal =  await Goal.create(newGoalData);

      // Redirect to the added goal's details page after shoing the flash message
      // This will create a res.locals.messages.success object and set the second arg as a value of this key
      req.flash("success", "Goal added successfully!");
      res.redirect(`/goals/${addedGoal._id}`)

    } catch(error) {
        console.error("Error  adding a new goal", error)
        res.status(500).render("error.ejs", {
            message: "Error while adding a new goal.",
            activePage: "goals"
        })
    }
}

// ------------------------------- Edit a goal ----------------------------------

// When the "edit" icon is clicked in the goal/index.ejs page (For parents only)
exports.edit_goal_get = async (req, res) => {
    const user = req.session.user
    const userFamilyId = user.familyId

    try{
        // Find the specified goal
        const goal = await Goal.findOne({
          _id: req.params.goalId,
          familyId: userFamilyId })

        // If no goal found
        if (!goal) {
            return res.status(404).render("error.ejs", {
                message: "Goal not found.",
                activePage: "goals"
            });
        }

        // If goal is found
        res.status(200).render("goals/edit.ejs", {goal, activePage:"goals"})

    } catch(error) {
        console.error("Error rendering the page", error)
        res.status(500).render("error.ejs", {
            message: "Error while rendering the required file."
        })
    }
}

// When the save button is clicked inside the "goals/add.ejs" file
exports.edit_goal_put = async (req, res) => {
  const user = req.session.user
  const userFamilyId = user.familyId

  try {
    // Ensure the goal belongs to the family
    const goal = await Goal.findOne({
      _id:req.params.goalId,
      familyId: userFamilyId});

    if (!goal) {
      return res.status(404).render("error.ejs", {
        message: "Goal not found."
      })
    }

    const updates = {
      title: req.body.title,
      description: req.body.description,
      targetAmount: req.body.targetAmount,
      currentAmount: req.body.currentAmount || goal.currentAmount,
      dueDate: req.body.dueDate,
      status: req.body.status,
    }

    // Only override coverImgURL if a new file was uploaded
    if (req.file) {
      updates.coverImgURL = `/public/images/goal-cover-images/${req.file.filename}`
    } else {
      // keep the old one if no file is provided
      updates.coverImgURL = goal.coverImgURL
    }

    goal.set(updates)
    await goal.save()

    req.flash("success", "Goal edited successfully!");
    res.redirect(`/goals/${goal._id}`)

  } catch (error) {
    console.error("Error editing the goal:", error)
    res.status(500).render("error.ejs", {
      message: "Error while editing the goal."
    });
  }
}


// ------------------------------------ DELETE  a goal ----------------------------------------------

// When the "trash" icon is clicked in the index.ejs page (Parent only)
exports.delete_goal = async (req, res) => {
    const user = req.session.user
    const userFamilyId = user.familyId

    try{
        // Find the specified goal
        const goal = await Goal.findOne({
          _id:req.params.goalId,
          familyId: userFamilyId});

        if (!goal){
            return res.status(404).render("error.ejs", {
                message: "Goal not found.",
                activePage: "goals"
            })
        }

        // Delete all contributions associated with the goal
        await Contribution.deleteMany({ goalId: goal._id });

        await goal.deleteOne()

        req.flash("success", "Goal deleted successfully!");
        res.redirect("/goals");

    } catch (error){
        console.error("Error deleting the goal", error)
        res.status(500).render("error.ejs", {
            message: "Error while deleteing the goal."
        })
    }
}