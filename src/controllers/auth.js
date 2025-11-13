//Dependencies
const User = require("../models/User")
const bcrypt = require("bcrypt")
const Family = require("../models/Family")
//Get method for first signup page
const get_signup = async (req, res) => {
  res.render("auth/sign-up.ejs", { page: 1 })
}
//Post method for first signup page
const post_signup = async (req, res) => {
  if (req.body.bio.length > 200) {
    return res.send("Bio id too long. It cannot exceed 200 characters")
  }
  // Ensuring email is not used
  const existingEmail = await User.findOne({ email: req.body.email })
  if (existingEmail) {
    return res.send("Email is already used")
  }
  //Ensuring password is confirmed
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password should match its confirm")
  }
  //Hashing password
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword
  // Checking role
  if (req.body.role === "Parent") {
    //Creating a temporary session for saving Parent first page data before pushing it to mongoDB
    req.session.parentData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: "Parent",
      // Parent status is always approved
      status: "Approved",
      profileImageUrl: req.body.profileImageUrl,
      bio: req.body.bio,
    }
    //Ensuring to redirect parent user to parent sign-up page
    res.redirect("/auth/sign-up/parent")
  } else if (req.body.role === "Child") {
    //Creating a temporary session for saving Child first page data before pushing it to mongoDB
    req.session.childData = req.body
    //Ensuring to child user to parent sign-up page
    res.redirect("/auth/sign-up/child")
  }
}
// Get method for parent Sign-up page ( User second page )
const get_signup_parent = (req, res) => {
  if (!req.session.parentData) {
    return res.redirect("/auth/sign-up")
  }
  res.render("auth/sign-up.ejs", { page: 2, role: req.session.parentData.role })
}
// Post method for parent Sign-up page ( User second page )
const post_signup_parent = async (req, res) => {
  if (!req.session.parentData) {
    return res.redirect("/auth/sign-up")
  }
  if (!req.body.parentFamilyName) {
    return res.send("You must input your Family name")
  } else if (req.body.parentFamilyName.length < 3) {
    return res.send("Family name must be at least 3 characters.")
  }
  const family = await Family.create({
    name: req.body.parentFamilyName,
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
  })
  delete req.session.parentData
  res.send(`Family created! Your family code is: ${req.body.code}`)
}

const get_signup_child = (req, res) => {
  if (!req.session.childData) {
    return res.redirect("/auth/sign-up")
  }
  res.render("auth/sign-up.ejs", { page: 2, role: "Child" })
}
const post_signup_child = async (req, res) => {
  if (!req.session.childData) {
    return res.redirect("/auth/sign-up")
  }
  if (!req.body.code) {
    return res.send("You must enter family code")
  }
  const family = await Family.findOne({
    code: req.body.code,
  })
  if (!family.name) {
    return res.send("Invalid family name")
  }
  if (!family) {
    return res.send("Invalid Family Code.")
  }

  const childSessionData = req.session.childData

  // Create User linked to this family
  const Child = await User.create({
    ...childSessionData,
    familyId: family._id,
    status: "Pending",
    profileImageUrl: "",
  })
  delete req.session.childData

  res.send(
    "You requested to join a Family, wait for Your parent to approve your request "
  )
}
module.exports = {
  get_signup,
  post_signup,
  get_signup_parent,
  post_signup_parent,
  get_signup_child,
  post_signup_child,
}
