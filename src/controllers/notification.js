const Notification = require("../models/Notification")
const Family = require("../models/Family")
const Goal = require("../models/Goal")
const User = require("../models/User")
const getNotificationIndexForParents = async (req, res) => {
  const user = req.session.user
  const family = await Family.findById(user.familyId)
  const parentId = family.parentId
  res.render("notifications/index.ejs", { layout: false })
}

module.exports = { getNotificationIndexForParents }
