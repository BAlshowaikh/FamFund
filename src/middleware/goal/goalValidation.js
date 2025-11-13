// Validation for the process of adding a new goal
module.exports.validateAddGoal = (req, res, next) => {
  const { title, description, targetAmount, dueDate, coverImgURL } = req.body;
  const errors = [];

  if (!title || title.trim().length < 3 || title.length > 100)
    errors.push("Title must be between 3–100 characters.");

  if (description && (description.length < 5 || description.length > 200))
    errors.push("Description must be between 5–200 characters.");

  if (!targetAmount || isNaN(targetAmount) || targetAmount < 10 || targetAmount > 10000)
    errors.push("Target amount must be a number between 10 and 10000 BD.");

  if (dueDate && new Date(dueDate) < new Date())
    errors.push("Due date cannot be in the past.");

  if (coverImgURL && !/^https?:\/\//i.test(coverImgURL))
    errors.push("Cover image must be a valid URL.");

  if (errors.length > 0)
    return res.status(400).render("error.ejs", { message: errors.join("<br>") });

  next();
};


module.exports.validateEditGoal = (req, res, next) => {
  const { title, description, targetAmount, dueDate, coverImgURL, status } = req.body;
  const errors = [];

  if (title && (title.trim().length < 3 || title.length > 100))
    errors.push("Title must be between 3–100 characters.");

  if (description && (description.length < 5 || description.length > 200))
    errors.push("Description must be between 5–200 characters.");

  if (targetAmount && (isNaN(targetAmount) || targetAmount < 10 || targetAmount > 10000))
    errors.push("Target amount must be between 10 and 10000 BD.");

  if (dueDate && new Date(dueDate) < new Date())
    errors.push("Due date cannot be in the past.");

  if (coverImgURL && !/^https?:\/\//i.test(coverImgURL))
    errors.push("Cover image must be a valid URL.");

  if (status && !["Active", "Completed", "Not Active"].includes(status))
    errors.push("Invalid status.");

  if (errors.length > 0)
    return res.status(400).render("error.ejs", { message: errors.join("<br>") });

  next();
};
