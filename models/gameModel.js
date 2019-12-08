const db = require("../callDB.js")
const pool = db.pool

function getAllGames(callback){
    var sql = `SELECT title FROM game_pub gp LEFT JOIN board_game bg ON gp.game_id = bg.game_id`

    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        callback(result.rows)
    })    
}

function getGameById(id, callback){
    var sql = `SELECT title, bg.game_id FROM game_pub gp LEFT JOIN board_game bg ON gp.game_id = bg.game_id WHERE bg.game_id = ${id}`
    
    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
      
        
        callback(result.rows)
    })
}

function postGame(title, time, complexity, num_players, callback){
    var sql = `INSERT INTO board_game (title, time_length_min, complexity, num_players) VALUES (${title}, ${time}, ${complexity}, ${num_players})`
    
    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        
        callback(result.rows)
    })
}

module.exports={
    getAllGames: getAllGames,
    getGameById: getGameById,
    postGame: postGame
}