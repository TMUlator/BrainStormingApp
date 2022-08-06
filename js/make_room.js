document.getElementById("makeRoomButton").onclick = () =>{
    console.log("Hello World!\n")
    //newRoom = 
    //roomID = newRoom.roomID
    roomID = "abc"
    location.href = "room.html?roomID=" + encodeURIComponent(roomID)
}