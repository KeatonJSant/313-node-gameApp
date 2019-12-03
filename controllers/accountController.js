const db = require('../callDB.js')
const bcrypt = require('bcryptjs')
const pool = db.pool

function getUser(req, res) {
    var user = req.body.user
    var pass = req.body.pass
    var sql = `SELECT username, password FROM member WHERE username = '${user}'`

    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        // Log this to the console for debugging purposes.
        const data = result.rows

        bcrypt.compare(pass, data[0].password, function(err, response) {
            if (response === false) {
                console.log("Bad Password!")
            }
        });
        
        console.log("Back from DB with result:");
        console.log(result.rows);
        
        const username = data[0].username
        var params = {username: username} 
        res.render("login", params)
        res.end()
    })
}

function addUser(req, res) {
    var name = req.body.name
    var user = req.body.user
    var pass = req.body.pass

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(pass, salt, function(err, hash) {
            var sql = `INSERT INTO member (username, password, name) VALUES ('${user}', '${hash}', '${name}')`
    
            pool.query(sql, function(err, result) {
                // If an error occurred...
                if (err) {
                    console.log("Error in query: ")
                    console.log(err);
                }
                // Log this to the console for debugging purposes.
                
            })
            res.sendFile("login.html", {root:"../" + "gameApp-node/public/html"})
        });
    });
    
    
}

module.exports = {getUser: getUser, addUser: addUser};



