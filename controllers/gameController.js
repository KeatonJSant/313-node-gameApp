const gameController = require("../models/gameModel.js")

function getGameList(req, res){
    console.log("Getting all Board Games...")
    gameController.getAllGames(function (results){
        console.log(results)
        res.json(results)
    })
   
}

function searchByTitle(req, res){
    //var id = req.query.id
    var title = req.query.title
    console.log("Getting board game with param id:" + title)

    gameController.searchByTitle(title, function(results){
        console.log(results)
        res.json(results)
    })
}

function searchByPub(req, res){
    var publisher = req.query.publisher
    gameController.searchByPub(publisher, function(results){
        console.log(results)
        res.json(results)
    })
}

function addGame(req, res){
    var title = req.body.title
    var time = req.body.time
    var complexity = req.body.complexity
    var num_players = req.body.num_players

    gameController.postGame(title, time, complexity, num_players, function(results){
        console.log(results)
        res.json(results)
    })
}

module.exports={getGameList: getGameList, searchByTitle: searchByTitle, searchByPub: searchByPub, addGame: addGame}