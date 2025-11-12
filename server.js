const express = require("express")

const app = express()

// Define the routes
app.get("/", (x, y) => {
    y.render("index.ejs")
})


app.listen(3000, () => {
    console.log("Srart the server!")
})