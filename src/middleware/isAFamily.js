const isAFamily = (req, res, next) => {
  if (req.session.user.familyId) return next()
  else {
    return res.send(
      "You cannot proceed in this operation because you are not a part of this family"
    )
  }
}
module.exports = isAFamily
