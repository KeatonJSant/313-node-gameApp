function searchByGame() {
    console.log("Searching by Game...")

    var title = $("#title").val()
    console.log("Game: " + title)

    $.get("/searchByTitle", {title:title}, function(data){
        console.log("Back from the server with:")
        console.log(data)
    })
}

function searchByPub() {
    console.log("Searching by Publisher...")

    var publisher = $("#publisher").val()
    console.log("Publisher: " + publisher)

    $.get("/searchByPub", {publisher: publisher}, function(data){
        console.log("Back from the server with:")
        console.log(data)
    })
}