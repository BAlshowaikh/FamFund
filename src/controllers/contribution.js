const mongoose = require("mongoose");
const Contribution = require("../models/Contribution");
const Goal = require("../models/Goal");

// ----------------------------------- Listing APIs -----------------------------------

// List all contributions for the logged in user
exports.listAll_contribution_get = async (req, res) => {
  try {
    const userId = req.session.user._id

    const userContributions = await Contribution.find({ contributorId: { $eq: userId } })
      .sort({ createdAt: -1 })
      .populate("goalId", "title targetAmount");

    return res.status(200).render("contributions/index.ejs", { userContributions })
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
    const contributorId = req.session.user._id;
    const familyId = req.session.user.familyId;
    const { goalId, amount, message } = req.body;

    if (!mongoose.isValidObjectId(goalId)) {
      return res.status(404).render("error.ejs", { message: "Invalid goal id." });
    }

    // Validate goal belongs to the same family as the user
    const goal = await Goal.findOne({ _id: goalId, familyId });
    if (!goal) {
      return res.status(404).render("error.ejs", {
        message: "Goal not found or not accessible."
      });
    }

    // Create contribution (server-side sets contributorId)
    await Contribution.create({
      goalId,
      contributorId,
      amount,
      message
    });

    // Go back to the user's goal's page
    return res.redirect(`/goals/${goalId}`);
  } catch (error) {
    console.error("Error on retrieving the contributions:", error);
    return res.status(500).render("error.ejs", {
      message: "Something went wrong while adding the contribution."
    });
  }
}
