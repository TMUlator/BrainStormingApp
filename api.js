const firebaseConfig = {
    apiKey: "AIzaSyDAgLcMvbvcUbfAifZfqrlZ9qmtC39US0M",
    authDomain: "tmulator-brainstorming.firebaseapp.com",
    projectId: "tmulator-brainstorming",
    storageBucket: "tmulator-brainstorming.appspot.com",
    messagingSenderId: "686034257330",
    appId: "1:686034257330:web:ff3baa007fc3274a2f10ab",
    measurementId: "G-VGSE4RRBGT"
  };
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const verification = "info"

//ルーム情報送信
async function sendRoomInfo(){
    const info = db.collection('brainstorm').doc(verification);
    const loadDoc = await info.get();
    let roomId = loadDoc.data().size;

    roomId++;
    const name = "room" + roomId;
    await info.set({
        size : roomId,
        [name] : {
            size : 0
        }},
        {merge : true}
    );
    return roomId;
}

//ルーム情報受信
async function getRoomInfo(roomNum){
    const info = db.collection('brainstorm').doc(verification);
    const name = "room"+roomNum;
    
    const loadDoc = await info.get();
    const roomObj = loadDoc.data()[name];

    return roomObj;
}

//テキスト情報送信
async function sendMsgInfo(roomNum,text){
    const info = db.collection('brainstorm').doc(verification);
    const roomName = "room"+roomNum;

    const loadDoc = await info.get();
    
    let roomId = loadDoc.data()[roomName].size;
    
    roomId++;
    const msgName = "msg"+roomId;
    await info.set({
        [roomName] : {
            size : roomId,
            [msgName] : {
                index : roomId,
                msg : text
            }
        }},
        {merge : true}
    );
}

//テキスト情報受信
async function getMsgInfo(roomId){
    const info = db.collection('brainstorm').doc(verification);
    const roomName = "room"+roomId;

    loadDoc = await info.get();
    const roomObj = loadDoc.data()[roomName];

    return roomObj;
}

//テキスト内容変更
async function changeMsgInfo(roomId,textId,text){
    const info = db.collection('brainstorm').doc(verification);
    const roomName = "room"+roomId;
    const msgName = "msg"+textId;

    await info.set({
        [roomName] : {
            [msgName] : text
        }},
        {merge : ture}
    );

    return 1;
}