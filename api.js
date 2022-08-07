const firebaseConfig = {
    apiKey: "AIzaSyDAgLcMvbvcUbfAifZfqrlZ9qmtC39US0M",
    authDomain: "tmulator-brainstorming.firebaseapp.com",
    projectId: "tmulator-brainstorming",
    storageBucket: "tmulator-brainstorming.appspot.com",
    messagingSenderId: "686034257330",
    appId: "1:686034257330:web:ff3baa007fc3274a2f10ab",
    measurementId: "G-VGSE4RRBGT"
  };
initializeApp(firebaseConfig);

const db = getFirestore();

const verification = "info_test1"

//ルーム情報送信
async function sendRoomInfo(){
    const info = doc(db,"brainstorm",verification);
    const loadDoc = await getDoc(doc);
    const room_id = loadDoc.data().size;

    const name = "room" + room_id;
    await info.setDoc(info,{
        size : room_id,
        [name] : {
            size : 0
        }},
        {merge : true}
    );
    return room_id;
}

//ルーム情報受信
async function getRoomInfo(roomNum){
    const info = doc(db,"brainstorm",verification);
    const name = "room"+roomNum;
    
    const loadDoc = await getDoc(doc);
    const roomObj = loadDoc.data()[name];

    if(verification.indexOf("test") != -1) console.log(roomObj);
    return roomObj;
}

//テキスト情報送信
async function sendMsgInfo(roomNum,text){
    const info = doc(db,"brainstorm",verification);
    const roomName = "room"+roomNum;

    const loadDoc = await getDoc(doc);
    
    let roomId = loadDoc.data()[roomName].size;
    
    roomId++;
    const msgName = "msg"+roomId;
    await info.setDoc(info,{
        [roomName] : {
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
    const info = doc(db,"brainstorm",verification);
    const roomName = "room"+roomId;

    loadDoc = await getDoc(doc);
    const roomObj = loadDoc.data()[roomName];

    if(verification.indexOf("test") != -1) console.log(roomObj);
    return roomObj;
}

//テキスト内容変更
async function changeMsgInfo(roomId,textId,text){
    const info = doc(db,"brainstorm",verification);
    const roomName = "room"+roomId;
    const msgName = "msg"+textId;

    await setDoc(doc,{
        [roomName] : {
            [msgName] : text
        }},
        {merge : ture}
    );

    return 1;
}
