require('dotenv').config()
const express = require("express")
const path = require('path')
const { Pool } = require("pg")

const app = express()
const connectionString = process.env.DATABASE_URL
const PORT = process.env.PORT || 5000
const pool = new Pool({connectionString: connectionString})

app.set("port", (PORT))
app.use(express.static(__dirname + '/public'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get("/login", (req, res)=>{
    var sql = "SELECT * FROM member"

    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        // Log this to the console for debugging purposes.
        console.log("Back from DB with result:");
        console.log(result.rows);
        const data = result.rows
        const username = data[0].username
        const password = data[0].password
        const name = data[0].name
        const member_id = data[0].member_id
        var params = {username: username, password: password, name: name, member_id: member_id} 
        res.render("login", params)
    })
})


app.get("/", (req, res)=>{
    console.log("You have entered the root.")
    res.sendFile("login.html", {root:__dirname + "/public/html"})
})

app.listen(app.get("port"), ()=>{
    console.log("Listening on port: " + app.get("port") + "...")
})
