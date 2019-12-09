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

function addGame() {
    console.log("Adding Board Game...")

    var title = $("#gameTitle").val()
    var time = $("#time").val()
    var complexity = $("#complexity").val()
    var num_players = $("#num_players").val()

    $.post("/addGame")

}

