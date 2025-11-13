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

//Use middleware

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(morgan("dev"))

// This means: Everything inside the /public folder is allowed to be served to the browser as static files not a route.
app.use('/public', express.static('public'))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

//Load AuthRoute
const authRouter = require("./src/routes/auth")
app.use("/auth", authRouter)

app.get("/", (req, res) => {
  res.render("index.ejs")
})

//Listen to port
app.listen(port, () => {
  console.log(`App is listening in port ${process.env.PORT}`)
})

