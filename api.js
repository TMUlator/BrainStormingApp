const {initializeApp, cert} = require('firebase-admin/app'); //パッケージ利用
const {getFirestore} = require('firebase-admin/firestore'); //パッケージ利用
const serviceAccount = require('./serviceAccountKey.json'); //firestore用秘密鍵
initializeApp ({credential : cert(serviceAccount)}); //秘密鍵の取得

const db = getFirestore();

const verification = "info_test"

//ルーム情報送信
async function sendRoomInfo(){
    const info = db.collection('brainstorm').doc(verification);
    const doc = await info.get();
    const size = doc.data().size;

    const name = "room" + size;
    await info.set({
        size : size,
        [name] : {
            size : 0
        }},
        {merge : true}
    );
}

//ルーム情報受信
async function getRoomInfo(roomNum){
    const info = db.collection('brainstorm').doc(verification);
    const name = "room"+roomNum;
    
    doc = await info.get();
    const array = doc.data()[name];

    if(verification.indexOf("test") != -1) console.log(array);
    else return array;
}

//テキスト情報送信
async function sendMsgInfo(roomNum,text){
    const info = db.collection('brainstorm').doc(verification);
    const roomName = "room"+roomNum;

    const doc = await info.get();
    
    let size = doc.data()[roomName].size;
    
    size++;
    const msgName = "msg"+size;
    await info.set({
        [roomName] : {
            [msgName] : {
                index : size,
                msg : text
            }
        }},
        {merge : true}
    );
}

//テキスト情報受信
async function getMsgInfo(roomNum){
    const info = db.collection('brainstorm').doc(verification);
    const roomName = "room"+roomNum;

    doc = await info.get();
    const array = doc.data()[roomName];

    if(verification.indexOf("test") != -1) console.log(array);
    else return array;
}
