//required packages
require('dotenv').config()
const express = require("express")
const session = require('express-session')
const path = require('path')
const user = require('./controllers/accountController.js')
const PORT = process.env.PORT || 5000

//app init
const app = express()
app.set("port", (PORT))
app.use(express.static(__dirname + '/public'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res)=>{
    console.log("You have entered the root.")
    res.sendFile("login.html", {root:__dirname + "/public/html"})
})

app.post("/login", user.getUser)
app.get("/signup", (req, res)=>{res.sendFile("signup.html", {root:__dirname + "/public/html"})})
app.post("/addUser", user.addUser)

app.listen(app.get("port"), ()=>{
    console.log("Listening on port: " + app.get("port") + "...")
})
