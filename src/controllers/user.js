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
    const user = await User.findById(req.params.userId)

    // Update normal fields
    user.username = req.body.username
    user.email = req.body.email
    user.bio = req.body.bio

    // Update image ONLY if user uploaded a file
    if (req.file) {
      user.profileImageUrl = `/profile-images/${req.file.filename}`
    }
    await user.save()
    req.session.user = user
    await req.session.save()
    res.redirect("/")
  }
}
module.exports = { getViewProfile, putViewProfile }
