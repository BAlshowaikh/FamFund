// Controllers require the following
// 1. Corresponding model 

const Goal = require("../models/Goal")

const Contribution = require("../models/Contribution") // Required for the delete

// -------------------------------------------CRUD--------------------------------

// ----------------------------------- Listing APIs -----------------------------------

// When clicked on "Goals" in the side bar
exports.listAll_goals_get = async (req, res) => {
    try{
        console.log("Reached controller")
        // Only show the goals associated to the user's family
        // const goals = await Goal.find({ familyId:{ $eq: user.familyId } }).sort({ "title": 1 })
        const goals = await Goal.find().sort({ "title": 1 })
        res.status(200).render("goals/index.ejs", {
            title: 'Goals | FamFund', goals ,activePage: 'goals',
        })
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
  try {
    const goal = await Goal.findById(req.params.goalId);

    if (!goal) {
      return res.status(404).render("error.ejs", {
        message: "Goal not found."
      });
    }

    goal.set({
      title: req.body.title,
      description: req.body.description,
      targetAmount: req.body.targetAmount,
      dueDate: req.body.dueDate,
      coverImgURL: req.body.coverImgURL,
      status: req.body.status 
    });

    await goal.save();

    res.redirect(`/goals/${goal._id}`);

  } catch (error) {
    console.error("Error editing the goal:", error);
    res.status(500).render("error.ejs", {
      message: "Error while editing the goal."
    });
  }
}


// ------------------------------------ DELETE  a goal ----------------------------------------------
const mongoose = require("mongoose")
// When the "trash" icon is clicked in the index.ejs page (Parent only)
exports.delete_goal = async (req, res) => {
    try{
        // Find the specified goal
        const goal = await Goal.findById(req.params.goalId)
        if (!goal){
            return res.status(404).render("error.ejs", {
                message: "Goal not found."
            })
        }

        // Delete all contributions associated with the goal
        await Contribution.deleteMany({ goalId: goal._id });

        goal.deleteOne()
        res.redirect("/goals");

    } catch (error){
        console.error("Error deleting the goal", error)
        res.status(500).render("error.ejs", {
            message: "Error while deleteing the goal."
        })
    }
}

// ---------------------- DUMMY ------------------------------
// GET /seed-goals  (only for dev!)
exports.seedDummy_goals_get = async (req, res) => {
  try {
    const dummyFamilyId = new mongoose.Types.ObjectId();
    const dummyUserId = new mongoose.Types.ObjectId();

    await Goal.deleteMany({}); // optional, to start clean

    await Goal.create([
      {
        title: "Trip",
        description: "Family beach trip",
        targetAmount: 200,
        currentAmount: 50,
        status: "Active",
        coverImgURL: "/public/images/trip.png",
        familyId: dummyFamilyId,
        createdByUserId: dummyUserId
      },
      {
        title: "New Pet",
        description: "Save for a cute cat",
        targetAmount: 80,
        currentAmount: 80,
        status: "Completed",
        coverImgURL: "/public/images/pet.png",
        familyId: dummyFamilyId,
        createdByUserId: dummyUserId
      }
    ]);

    res.send("Dummy goals seeded 👍");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error seeding goals");
  }
}