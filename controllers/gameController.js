const gameModel = require("../models/gameModel.js")

function getGameList(req, res){
    console.log("Getting all Board Games...")
    gameModel.getAllGames(function (results){
        console.log(results)
        res.json(results)
    })
   
}

function searchByTitle(req, res){
    //var id = req.query.id
    var title = req.query.title
    console.log("Getting board game with param id:" + title)

    gameModel.searchByTitle(title, function(results){
        console.log(results)
        res.json(results)
    })
}

function searchByPub(req, res){
    var publisher = req.query.publisher
    console.log("Requested Publisher: " + publisher)
    gameModel.searchByPub(publisher, function(results){
        console.log(results)
        res.json(results)
    })
}

function getPub(req, res){
    var id = req.query.id
    gameModel.getPub(id, function(results){
        console.log(results)
        res.json(results)
    })
}

function getIdByTitle(req, res){
    var title = req.query.title
    gameModel.getIdByTitle(title, function(results){
        console.log(results)
        res.json(results)
    })
}

function addGame(req, res){
    var title = req.body.title
    var time = req.body.time
    var complexity = req.body.complexity
    var num_players = req.body.num_players

    console.log("Title: " + title + " Time: " + time + " Complexity: " + complexity + " Number of Players: " + num_players)

    gameModel.postGame(title, time, complexity, num_players, function(results){
        console.log(results)
        res.json(results)
    })
}

function addPub(req, res){
    var publisher = req.body.publisher

    console.log("Publisher: " + publisher)

    gameModel.postPub(publisher, function(results){
        console.log(results)
        res.json(results)
    })
}

function addUniqueGame(req, res){
    var game_id = req.body.game
    var pub_id = req.body.pub

    console.log(game_id)
    console.log(pub_id)

    gameModel.postUniqueGame(game_id, pub_id, function(results){
        console.log(results)
        res.json(results)
    })
}

module.exports={
    getGameList: getGameList, 
    searchByTitle: searchByTitle, 
    searchByPub: searchByPub, 
    getPub: getPub,
    getIdByTitle: getIdByTitle,
    addGame: addGame, 
    addPub: addPub,
    addUniqueGame: addUniqueGame}