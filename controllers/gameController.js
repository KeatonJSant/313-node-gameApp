const gameController = require("../models/gameModel.js")

function getGameList(req, res){
    console.log("Getting all Board Games...")
    gameController.getAllGames(function (results){
        console.log(results)
        res.json(results)
    })
   
}

function getGame(req, res){
    //var id = req.query.id
    var id = req.params.id
    console.log("Getting board game with param id:" + id)

    gameController.getGameById(id, function(results){
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

module.exports={getGameList: getGameList, getGame: getGame, addGame: addGame}