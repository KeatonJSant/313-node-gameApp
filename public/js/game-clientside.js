function searchByGame(){
    var title = $("#title").val()
    $("#tbGames").html("<tr><th>Title</th><th>Est. Time (minutes)</th><th>Complexity</th><th>Max # Players</th><th>Publishers</th></tr>")
    $.get("/searchByTitle", {title:title}, async function(data_game){

        for (var x = 0; x < data_game.list.length; x++){
            var game = data_game.list[x]
            console.log(game)
            $("#tbGames").append("<tr><td>" + game.title + "</td><td>" + game.time_length_min + "</td><td>" + game.complexity + "</td><td>" + game.num_players + `</td><td id='pub${x}'></td></tr>`)
            await $.get("/getPub", {id:game.game_id}, async function(data_pub){
                for (var i = 0; i < data_pub.list.length; ++i){
                    var pub = data_pub.list[i]
                    console.log(pub)
                    if (i > 0){
                        $(`#pub${x}`).append(", ")
                    }
                    $(`#pub${x}`).append(pub.pub_name)
                    console.log("2nd x = " + x)
                }
            })
        }
    })
}

function searchByPub() {
    console.log("Searching by Publisher...")

    var publisher = $("#pub").val()
    console.log("Publisher: " + publisher)

    $.get("/searchByPub", {publisher: publisher}, function(data){
        console.log("Back from the server with:")
        console.log(data)

        $("#tbGames").html("<tr><th>Title</th><th>Est. Time Length (minutes)</th><th>Complexity</th><th>Max Number Players</th></tr>")
        for (var x = 0; x < data.list.length; x++) {
            var game = data.list[x]

            $("#tbGames").append("<tr><td>" + game.title + "</td><td>" + game.time_length_min + "</td><td>" + game.complexity + "</td><td>" + game.num_players + "</td></tr>")
        }
    })
}

function allGames() {
    $.get("/boardGames", async function (data){
        $("#tbAllGames").html("<tr><th>Title</th><th>Est. Time (minutes)</th><th>Complexity</th><th>Max # Players</th><th>Publishers</th></tr>")
        for (var x = 0; x < data.list.length; x++) {
            var game = data.list[x]
            $("#tbAllGames").append("<tr><td>" + game.title + "</td><td>" + game.time_length_min + "</td><td>" + game.complexity + "</td><td>" + game.num_players + `</td><td id='all${x}'></td></tr>`)
            await $.get("/getPub", {id:game.game_id}, async function(data_pub){
                for (var i = 0; i < data_pub.list.length; ++i){
                    var pub = data_pub.list[i]
                    console.log(pub)
                    if (i > 0){
                        $(`#all${x}`).append(", ")
                    }
                    $(`#all${x}`).append(pub.pub_name)
                    console.log("2nd x = " + x)
                }
            })
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

