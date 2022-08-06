document.getElementById("join").onclick = () =>{
    console.log("join button clicked");

    let room_id = document.getElementById("room_id").value;

    console.log("room_id : ", room_id);

    // Transition and pass the room_id
    location.href = "room.html?room_id=" + encodeURIComponent(room_id);

}

