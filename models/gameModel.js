const db = require("../callDB.js")
const pool = db.pool

function getAllGames(callback){
    var sql = `SELECT title FROM game_pub gp LEFT JOIN board_game bg ON gp.game_id = bg.game_id`

    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        } else {

            var results = {
                list:result.rows
            }
            callback(results)
        }
        
    })    
}

function searchByTitle(title, callback){
    var sql = `SELECT title FROM board_game WHERE title = $1::text`
    var params = [title]
    pool.query(sql, params, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        } else {
            var results = {
                list:result.rows
            }
            callback(results)
        }
      
    })
}

function searchByPub(publisher, callback){
    var sql = `SELECT title FROM board_game bg LEFT JOIN game_pub gp ON bg.game_id = gp.game_id LEFT JOIN publisher p ON gp.pub_id = p.pub_id WHERE pub_name = $1::text`
    var params = [publisher]
    pool.query(sql, params, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        } else {
            var results = {
                list:result.rows
            }
            callback(results)
        }
      
    })
}

function postGame(title, time, complexity, num_players, callback){
    var sql = `INSERT INTO board_game (title, time_length_min, complexity, num_players) VALUES ($1::text, $2::int, $3::numeric, $4::int)`
    var params = [title, time, complexity, num_players]
    pool.query(sql, params, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        } else {
            callback(result.rows)
        }
    })
}

module.exports={
    getAllGames: getAllGames,
    searchByTitle: searchByTitle,
    searchByPub: searchByPub,
    postGame: postGame
}