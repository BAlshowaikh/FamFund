const User = require("../models/User")
const bcrypt = require("bcrypt")
const Family = require("../models/Family")
const get_signup = async (req, res) => {
  res.render("auth/sign-up.ejs")
}

const post_signup = async (req, res) => {
  console.log("BODY:", req.body)

  const existingEmail = await User.findOne({ email: req.body.email })
  if (existingEmail) {
    return res.send("Email is already used")
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password should match its confirm")
  }
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  const userData = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: req.body.role,
    status: req.body.status,
    profileImageUrl: req.body.profileImageUrl,
    familyId: req.body.familyId,
  }
  if (userData.role === "Parent") {
    req.session.partialUser = userData
    return res.render("auth/sign-up-parent.ejs")
  }
  if (userData.role === "Child") {
    req.session.partialUser = userData
    return res.render("auth/sign-up-child.ejs")
  }
}
const post_signup_parent = async (req, res) => {
  const userData = req.session.partialUser
  if (!userData) return res.redirect("/auth/sign-up")

  const family = await Family.create({ name: req.body.familyName })

  userData.profileImageUrl = "/uploads/" + req.file.filename
  userData.familyId = family._id

  const user = await User.create(userData)
  req.session.userId = user._id
  delete req.session.partialUser
  res.send(`Thank you for signing up ${req.session.user._id}`)
}

module.exports = { get_signup, post_signup, post_signup_parent }
