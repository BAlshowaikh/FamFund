const Family = require("../models/Family")
const User = require("../models/User")
const getJoinRequests = async (req, res) => {
  const parentId = req.session.user._id
  const family = await Family.findOne({ parentId })
  const childJoinRequests = await User.find({
    familyId: family._id,
    status: "Pending",
    role: "Child",
  })
  return res.render("notifications/join-requests.ejs", {
    layout: false,
    user: req.session.user,
    family,
    childJoinRequests,
  })
}

module.exports = { getJoinRequests }
