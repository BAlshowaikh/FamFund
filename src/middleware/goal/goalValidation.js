// Validation for the process of adding a new goal
module.exports.validateAddGoal = (req, res, next) => {
  const { title, description, targetAmount, dueDate, coverImgURL, currentAmount } = req.body;
  const errors = [];

  if (!title || title.trim().length < 3 || title.length > 100){
    errors.push("Title must be between 3–100 characters.")
  }

  if (description && (description.length < 5 || description.length > 200)){
    errors.push("Description must be between 5–200 characters.")
  }

  if (!targetAmount || isNaN(targetAmount) || targetAmount < 10 || targetAmount > 10000){
    errors.push("Target amount must be a number between 10 and 10000 BD.")
  }

  if (dueDate && new Date(dueDate) < new Date())
    errors.push("Due date cannot be in the past.")

  if (currentAmount > targetAmount){
  errors.push("Current Amount can't be bigger than the target amount")  
  }

  // .join method
  // used to combine all elements of the `errors` array into a single string. the <br> is the seperator between the elements
  if (errors.length > 0)
    return res.status(400).render("error.ejs", { message: errors.join("<br>") })

  next();
}

// Validation for the process of editing a goal
module.exports.validateEditGoal = (req, res, next) => {
  const { title, description, targetAmount, dueDate, coverImgURL, status, currentAmount} = req.body;
  const errors = [];

  if (title && (title.trim().length < 3 || title.length > 100))
    errors.push("Title must be between 3–100 characters.")

  if (description && (description.length < 5 || description.length > 200))
    errors.push("Description must be between 5–200 characters.")

  if (targetAmount && (isNaN(targetAmount) || targetAmount < 10 || targetAmount > 10000))
    errors.push("Target amount must be between 10 and 10000 BD.")

  if (dueDate && new Date(dueDate) < new Date())
    errors.push("Due date cannot be in the past.");


  if (status && !["Active", "Completed", "Not Active"].includes(status))
    errors.push("Invalid status.")

    if (currentAmount > targetAmount){
  errors.push("Current Amount can't be bigger than the target amount")  
  }

  if (errors.length > 0)
    return res.status(400).render("error.ejs", { message: errors.join("<br>") })

  next();
}
