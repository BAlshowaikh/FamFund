//Dependencies
const session = require("express-session")
const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const app = express()
const mongoose = require("./src/config/db")
const path = require("path")
const port = process.env.PORT ? process.env.PORT : 3000

//Require Middleware
const morgan = require("morgan")
const methodOverride = require("method-override")
const expressLayouts = require("express-ejs-layouts")
const checkIfSignedIn = require("./src/middleware/isSignedIn")
//Use middleware

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

app.use(morgan("dev"))

// For dynamic rendreing the main layout page
app.set("view engine", "ejs") // Explicitly tells to use the ejs render engine to render the view
app.set("views", "views") // Tells that my views are in a folder named 'views'
app.set("layout", "layouts/main") // Tell Express which file is the default layout wrapper
app.use(expressLayouts)

// This means: Everything inside the public folder is allowed to be served to the browser as static files not a route.
app.use("/public", express.static("public"))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
// Routes that doesn't require to check if Signed in
const excludedRoutes = [
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/sign-up/parent",
  "/auth/sign-up/child",
  "/auth/sign-out",
]
// Check if the path contains one of the above listed routes
app.use((req, res, next) => {
  if (excludedRoutes.some((route) => req.path.startsWith(route))) {
    return next()
  }

  // Otherwise enforce login
  return checkIfSignedIn(req, res, next)
})
//Load Our Routes
const authRouter = require("./src/routes/auth")
const profileRouter = require("./src/routes/user")
app.use("/auth", authRouter)
app.use("/profile", profileRouter)
app.get("/", (req, res) => {
  res.render("index.ejs", {
    title: "Dashboard | FamFund",
    activePage: "dashboard",
  })
})

// --------------------- Required Routes ----------------------
const goalRouter = require("./src/routes/goal")
const contRouter = require("./src/routes/contribution")

// ----------------- Use the routes ----------------
app.use("/goals", goalRouter)
app.use("/contributions", contRouter)

//Listen to port
app.listen(port, () => {
  console.log(`App is listening in port ${process.env.PORT}`)
})
