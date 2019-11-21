require('dotenv').config()
const express = require("express")
const { Pool } = require("pg")

const app = express()
const connectionString = process.env.DATABASE_URL
const PORT = process.env.PORT || 5000
const pool = new Pool({connectionString: connectionString})

app.set("port", (PORT))
app.use(express.static(__dirname + '/public'))

app.listen(app.get("port"), ()=>{
    console.log("Listening on port: " + app.get("port") + "...")
})

app.get("/", (req, res)=>{
    console.log("You have entered the root.")
    res.sendFile("login.html", {root:__dirname + "/public/html"})
})

