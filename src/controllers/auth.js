const User = require("../models/User")
const bcrypt = require("bcrypt")
const Family = require("../models/Family")
const get_signup = async (req, res) => {
  res.render("auth/sign-up.ejs", { page: 1 })
}

const post_signup = async (req, res) => {
  const existingEmail = await User.findOne({ email: req.body.email })
  if (existingEmail) {
    return res.send("Email is already used")
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password should match its confirm")
  }
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  req.session.parentData = req.body
  res.redirect("/auth/sign-up/parent")
}
const get_signup_parent = (req, res) => {
  if (!req.session.parentData) {
    return res.redirect("/auth/sign-up")
  }
  res.render("auth/sign-up.ejs", { page: 2, role: req.session.parentData.role })
}

const post_signup_parent = async (req, res) => {
  if (!req.session.parentData) {
    return res.redirect("/auth/sign-up")
  }

  if (!req.body.name) {
    return res.send("You must input your Family name")
  } else if (req.body.name < 3) {
    return res.send("Family name must be at least 3 characters.")
  }

  const family = await Family.create({
    name: req.body.name,
    code: req.body.code,
    parentId: null,
  })

  const parentSessionData = req.session.parentData

  // Create User linked to this family
  const parent = await User.create({
    ...parentSessionData,
    familyId: family._id,
    status: "Approved",
    profileImageUrl: "",
  })

  await Family.findByIdAndUpdate(family._id, {
    parentId: parent._id,
    $addToSet: { members: parent._id },
  })
  delete req.session.parentData

  res.send(`Family created! Your family code is: ${req.body.code}`)
}

module.exports = {
  get_signup,
  post_signup,
  get_signup_parent,
  post_signup_parent,
}
