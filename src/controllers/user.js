const User = require("../models/User")
const Family = require("../models/Family")

const getViewProfile = async (req, res) => {
  const userId = req.params.userId

  const user = await User.findById(userId)
  const family = await Family.findById(user.familyId)
  return res.render("profile/profile-view.ejs", {
    user,
    layout: false,
    family,
  })
}
const putViewProfile = async (req, res) => {
  {
    const listing = await User.findByIdAndUpdate(req.params.userId, {
      username: req.body.username,
      email: req.body.email,
      bio: req.body.bio,
    })

    res.redirect("/")
  }
}
module.exports = { getViewProfile, putViewProfile }
