const isAUser = (req, res, next) => {
  if (req.session.user._id === req.params.userId) return next()
  res.send(
    "You cannot proceed in this operation and change settings for other user"
  )
}
module.exports = isAUser
