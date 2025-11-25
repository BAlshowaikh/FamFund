const Notification = require("../models/Notification")
const Family = require("../models/Family")
const User = require("../models/User")

const getNotificationIndexForParents = async (req, res) => {
  const user = req.session.user

  res.render("notifications/index.ejs", {
    layout: false,
    user,
    activePage: "index",
  })
}

const getJoinRequests = async (req, res) => {
  const user = req.session.user

  if (user.role !== "Parent") return res.status(403).send("Unauthorized")

  const family = await Family.findOne({ parentId: user._id })

  if (!family) {
    return res.render("notifications/join-requests.ejs", {
      user,
      childJoinRequests: [],
      layout: false,
      activePage: "join-request",
    })
  }

  const childJoinRequests = await User.find({
    familyId: family._id,
    status: "Pending",
    role: "Child",
  })

  res.render("notifications/join-requests.ejs", {
    user,
    childJoinRequests,
    layout: false,
    activePage: "join-request",
  })
}

const respondToJoinRequests = async (req, res) => {
  const childId = req.params.id

  await User.findByIdAndUpdate(childId, {
    status: "Approved",
  })

  res.redirect("/notifications/join-requests")
}

module.exports = {
  getNotificationIndexForParents,
  getJoinRequests,
  respondToJoinRequests,
}
