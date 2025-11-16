//Dependencies
const User = require("../models/User")
const bcrypt = require("bcrypt")
const Family = require("../models/Family")
//Get method for first signup page
const get_signup = async (req, res) => {
  res.render("auth/sign-up.ejs", { page: 1, layout: false })
}
//Post method for first signup page
const post_signup = async (req, res) => {
  if (req.body.bio && req.body.bio.length > 200) {
    return res.send("Bio is too long. It cannot exceed 200 characters")
  }
  // Ensuring email is not used
  const existingEmail = await User.findOne({ email: req.body.email.trim() })
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
  let profileImageUrl = ""
  if (req.file) {
    profileImageUrl = `/public/images/profile-images/${req.file.filename}`
  }
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
      profileImageUrl,
      bio: req.body.bio,
    }
    //Ensuring to redirect parent user to parent sign-up page
    return res.redirect("/auth/sign-up/parent")
  } else if (req.body.role === "Child") {
    //Creating a temporary session for saving Child first page data before pushing it to mongoDB
    req.session.childData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: "Child",
      status: "Approved",
      bio: req.body.bio,
      profileImageUrl,
    }
    //Ensuring to child user to parent sign-up page
    return res.redirect("/auth/sign-up/child")
  }
}
// Get method for parent Sign-up page ( User second page )
const get_signup_parent = (req, res) => {
  if (!req.session.parentData) {
    return res.redirect("/auth/sign-up")
  }
  res.render("auth/sign-up.ejs", {
    page: 2,
    role: req.session.parentData.role,
    layout: false,
  })
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
  })
  await Family.findByIdAndUpdate(family._id, {
    parentId: parent._id,
  })
  delete req.session.parentData
  res.redirect("/auth/sign-in")
}

const get_signup_child = (req, res) => {
  if (!req.session.childData) {
    return res.redirect("/auth/sign-up")
  }
  res.render("auth/sign-up.ejs", { page: 2, role: "Child", layout: false })
}
//
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
  if (!family) {
    return res.send("Invalid Family Code.")
  }

  const childSessionData = req.session.childData

  // Create User linked to this family
  const Child = await User.create({
    ...childSessionData,
    familyId: family._id,
    status: "Approved",
  })
  delete req.session.childData

  return res.redirect("/auth/sign-in")
}

// Get method for sign in
const get_signin = async (req, res) => {
  res.render("auth/sign-in.ejs", { layout: false })
}
//Post method for sign in
const post_signin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.send("Invalid Email!")
  }
  const validPassword = bcrypt.compareSync(req.body.password, user.password)
  if (!validPassword) {
    return res.send("Login failed, make sure you input correct password")
  }
  if (user.status === "Pending") {
    return res.send(
      "Your request for joining the family is at pending and not approved yet"
    )
  } else if (user.status === "Rejected") {
    return res.send("Your request for joining the family is Rejected")
  }
  req.session.user = {
    _id: user._id,
    username: user.username,
    role: user.role,
  }
  return res.redirect("/")
}
const get_signout = async (req, res) => {
  req.session.destroy()
  return res.redirect("/auth/sign-in")
}
module.exports = {
  get_signup,
  post_signup,
  get_signup_parent,
  post_signup_parent,
  get_signup_child,
  post_signup_child,
  get_signin,
  post_signin,
  get_signout,
}
