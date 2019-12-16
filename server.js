require('dotenv').config()
const express = require("express")
const path = require('path')
const gameController = require("./controllers/gameController.js")
const PORT = process.env.PORT || 5000


const app = express()

app.set("port", (PORT))
app.use(express.static(path.join(__dirname + '/public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res)=>{
    res.sendFile("boardGame.html", {root:__dirname + "/public/html"})
})

app.get("/boardGames", gameController.getGameList)

app.get("/searchByTitle", gameController.searchByTitle)
app.get("/searchByPub", gameController.searchByPub)
app.get("/getPub", gameController.getPub)
app.get("/getIdByTitle", gameController.getIdByTitle)

app.post("/addGame", gameController.addGame)
app.post("/addPub", gameController.addPub)
app.post("/addUniqueGame", gameController.addUniqueGame)

app.listen(app.get("port"), ()=>{
    console.log("Listening on port: " + app.get("port") + "...")
})


