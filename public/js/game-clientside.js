function searchByGame() {
    console.log("Searching by Game...")

    var title = $("#title").val()
    console.log("Game: " + title)

    $.get("/searchByTitle", {title:title}, function(data){
        console.log("Back from the server with:")
        console.log(data)
        $("#ulGames").html("")
        for (var x = 0; x < data.list.length; x++) {
            var game = data.list[x]

            $("#ulGames").append("<li>" + game.title + "</li>")
        }
    })
}

function searchByPub() {
    console.log("Searching by Publisher...")

    var publisher = $("#publisher").val()
    console.log("Publisher: " + publisher)

    $.get("/searchByPub", {publisher: publisher}, function(data){
        console.log("Back from the server with:")
        console.log(data)

        $("#ulGames").html("")
        for (var x = 0; x < data.list.length; x++) {
            var game = data.list[x]

            $("#ulGames").append("<li>" + game.title + "</li>")
        }
    })
}

function allGames() {
    $.get("/boardGames", function (data){
        $("#ulAllGames").html("")
        for (var x = 0; x < data.list.length; x++) {
            var game = data.list[x]

            $("#ulAllGames").append("<li>" + game.title + "</li>")
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

