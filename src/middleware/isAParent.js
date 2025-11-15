const isAParent = (req, res, next) => {
  if (req.session.user.role === "Parent") {
    return next()
  }
  return res.send(
    "You cannot proceed in this operation because you're not a Parent"
  )
}
module.exports = isAParent
