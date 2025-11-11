//Dependencies
const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const mongoose = require("./src/config/db")
const port = process.env.PORT ? process.env.PORT : 3000

//Require Middleware
const morgan = require("morgan")
const methodOverride = require("method-override")

//Use middleware
app.use(express.urlencoded())
app.use(methodOverride("_method"))
app.use(morgan("dev"))
/*
app.get("/", (req, res) => {
  res.send("Hello")
})*/
//Listen to port
app.listen(port)
