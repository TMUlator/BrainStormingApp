document.getElementById("makeRoomButton").onclick = async () =>{
    console.log("Hello World!\n");
    roomID = await sendRoomInfo();
    //roomID = "abc";
    location.href = "room.html?roomID=" + encodeURIComponent(roomID);
}