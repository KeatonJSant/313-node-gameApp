function searchByGame() {
    console.log("Searching by Game...")

    var title = $("#title").val()
    console.log("Game: " + title)
    $("#tbGames").html("<tr><td>Title</td><td>Est. Time (minutes)</td><td>Complexity</td><td>Max # Players</td><td>Publishers</td></tr>")
    $.get("/getIdByTitle", {title:title}, async function(data){
        var z
        for (z = 0; z < data.list.length; ++z){
            id = data.list[z]
            await $.get("/searchByTitle", {id:id.game_id}, function(data_game){
                console.log("Back from the server with:")
                console.log(data_game)
                var x
                for (x = 0; x < data_game.list.length; ++x) {
                    var game = data_game.list[x]
                    $("#tbGames").append("<tr><td>" + game.title + "</td><td>" + game.time_length_min + "</td><td>" + game.complexity + "</td><td>" + game.num_players + `</td><td id='${x}'></td></tr>`)
                    console.log("1st x = " + x)
                    await $.get("/getPub", {id:game.game_id}, function(data_pub){
                        var i
                        for (i = 0; i < data_pub.list.length; ++i){
                            pub = data_pub.list[i]
                            console.log(pub)
                            if (i > 0){
                                $(`#${x}`).append(", ")
                            }
                            $(`#${x}`).append(pub.pub_name)
                            console.log("2nd x = " + x)
                        }
                    })
                }
            })
        }        
    })
    
}


// function  searchByGame() {
//     var title = $("#title").val()
//     $("#tbGames").html("<tr><td>Title</td><td>Est. Time (minutes)</td><td>Complexity</td><td>Max # Players</td><td>Publishers</td></tr>")
//     $.get("/getIdByTitle", {title:title}, async function(data){
//         var dat = data.list.length
//         for (var i = 0; i < 10; i++) {
//             await i
//             console.log(contents)
//           }
//     }
//     async function printFiles () {
//         const files = await getFilePaths()
      
        
//     }
// }


function searchByPub() {
    console.log("Searching by Publisher...")

    var publisher = $("#pub").val()
    console.log("Publisher: " + publisher)

    $.get("/searchByPub", {publisher: publisher}, function(data){
        console.log("Back from the server with:")
        console.log(data)

        $("#tbGames").html("<tr><td>Title</td><td>Est. Time Length (minutes)</td><td>Complexity</td><td>Max Number Players</td></tr>")
        for (var x = 0; x < data.list.length; x++) {
            var game = data.list[x]

            $("#tbGames").append("<tr><td>" + game.title + "</td><td>" + game.time_length_min + "</td><td>" + game.complexity + "</td><td>" + game.num_players + "</td></tr>")
        }
    })
}

function allGames() {
    $.get("/boardGames", function (data){
        $("#tbAllGames").html("")
        for (var x = 0; x < data.list.length; x++) {
            var game = data.list[x]

            $("#tbAllGames").append("<li>" + game.title + "</li>")
        }
    })
}

function addGame() {
    console.log("Adding Board Game...")

    var title = $("#gameTitle").val()
    var time = $("#time").val()
    var complexity = $("#complexity").val()
    var num_players = $("#num_players").val()
    var pub_name = $("#publisher").val()

    $.post("/addGame", {title:title, time:time, complexity:complexity, num_players:num_players}, function (data_game) {
        console.log("game: " + data_game[0].game_id)
        $.post("/addPub", {publisher:pub_name}, function(data_pub){
            console.log("pub: " + data_pub[0].pub_id)
            $.post("/addUniqueGame", {game:data_game[0].game_id, pub:data_pub[0].pub_id}, function(data_unique_game) {
                console.log(data_unique_game)
                allGames()
            })
        })    
    })
}

