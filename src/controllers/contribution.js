const mongoose = require("mongoose");
const Contribution = require("../models/Contribution");
const Goal = require("../models/Goal");

// ----------------------------------- Listing APIs -----------------------------------

// List all contributions for the logged in user
exports.listAll_contribution_get = async (req, res) => {
  try {
    const userId = req.session.user._id

    const contributions = await Contribution.find({ contributorId: { $eq: userId } })
      .sort({ createdAt: -1 })
      .populate("goalId", "title targetAmount");

    return res.status(200).render("contributions/index.ejs", { contributions, activePage: "contributions" })
  } catch (error) {
    console.error("Error on retrieving the contributions:", error);
    return res.status(500).render("error.ejs", {
      message: "Something went wrong while fetching the contributions."
    })
  }
}

// When a "View Details" button is clicked in the contributions/index.ejs page
exports.listOne_contribution_get = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const contId = req.params.contId;

    if (!mongoose.isValidObjectId(contId)) {
      return res.status(404).render("error.ejs", { message: "Invalid contribution id." });
    }

    const contribution = await Contribution.findOne({
      _id: contId,
      contributorId: userId, // ownership check
    }).populate("goalId", "title targetAmount");

    if (!contribution) {
      return res.status(404).render("error.ejs", { message: "Specified contribution is not found" })
    }

    return res.status(200).render("contributions/details.ejs", { contribution })
  } catch (error) {
    console.error("Error on retrieving the contributions:", error)
    return res.status(500).render("error.ejs", {
      message: "Something went wrong while fetching the contributions."
    })
  }
}

// ---------------------------------- Add new contribution ----------------------------------
exports.add_cont_get = async (req, res) => {
  try {
    return res.status(200).render("contributions/add.ejs")
  } catch (error) {
    console.error("Error on rendering the page:", error);
    return res.status(500).render("error.ejs", {
      message: "Something went wrong while rendering the page."
    });
  }
}

exports.add_cont_post = async (req, res) => {
  try {
    const contributorId = req.session.user._id
    const familyId = req.session.user.familyId
    const goalId = req.params.goalId
    const {amount, message } = req.body

    // Validate goal belongs to the same family as the user
    const goal = await Goal.findOne({ _id: goalId, familyId })
    if (!goal) {
      return res.status(404).render("error.ejs", {
        message: "Goal not found or not accessible.",
        activePage: "goals"
      })
    }


    // Create contribution 
    await Contribution.create({
      goalId,
      contributorId,
      amount,
      message
    })

    goal.currentAmount += Number(amount)
    await goal.save();

    // Go back to the user's goal's page
    return res.redirect(`/goals/${goalId}`);
  } catch (error) {
    console.error("Error on retrieving the contributions:", error);
    return res.status(500).render("error.ejs", {
      message: "Something went wrong while adding the contribution."
    })
  }
}

// --------------------DUMMY CREATE ---------------------
exports.dummy_add_contribution_post = async (req, res) => {
      console.log("inside controller")
  try {
    const { goalId } = req.params; 
    const {amount, message } = req.body;

    const goal = await Goal.findById(goalId);
    if (!goal) {
      return res.status(404).render("error.ejs", {
        message: "Goal not found.",
      });
    }

    const numericAmount = Number(amount);
    const remaining = goal.targetAmount - goal.currentAmount;

    // backend validation to mirror the frontend rules
    if (
      !numericAmount ||
      numericAmount <= 0 ||
      numericAmount > goal.targetAmount ||
      numericAmount > remaining
    ) {
      return res.status(400).render("error.ejs", {
        message: `Invalid contribution amount.`,
      });
    }

    // TEMP: arbitrary contributorId (until you have real users)
    const dummyUserId = new mongoose.Types.ObjectId();

    await Contribution.create({
      amount: numericAmount,
      message,
      contributorId: dummyUserId,
      goalId: goal._id,
    });

    // Update goal currentAmount
    goal.currentAmount += numericAmount;
    await goal.save();
    console.log(`body: ${req.body}`)
  return res.redirect(`/goals/${goalId}`);

  } catch (error) {
    console.error("Error adding contribution:", error);
    res.status(500).render("error.ejs", {
      message: "Something went wrong while adding the contribution.",
    });
  }
};
