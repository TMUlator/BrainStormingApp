// * Function Definition * 
// Room Data Send Func: sendRoomInfo()  -> return: room Obj
// Get Room Info: getRoomInfo(roomNumber) -> return: room Obj
// Send Message Info: sendMsgInfo(messageObj) -> return: message index Num
// Get Message Info:  getMsgInfo(roomNumber) -> return: message Object

// firebase_client_libraryは任意の名前
// import firebase from "firebase_client_library";
// import "firebase/firestore";

// querySelector: CSSセレクタ記法から要素を取得するもの

// room numを指定するボタンがない -> 

// MARK: room numを直接指定しないと動かない

//指定したRoom内のText全部取得
const roomID_ = getRoomInfo(1)
// roomID_.then((Room) => console.log("Room ID:", Room))
let messagesFromDB = []
// MARK: このファイルで一つ一つ指定してから取得することは可能だが、それだとmessageだけを取得する間数を指定した意味がないのでは。。？
// また、表示する枠の存在がhtmlで作成されていない ->　このファイルで作成することは可能だが、それだとコードが長くなる可能性がある


// message取得後、displayMessages呼び出し
roomID_.then((roomDocs) => {
    const size = roomDocs["size"]

    for(let i = 1; i <= size; i++){
        const msg_obj = roomDocs["msg"+i]
        messagesFromDB.push(msg_obj.msg)
    }
    // console.log(messages)
    console.log(messagesFromDB)
    console.log(messagesFromDB.length)

    displayMessages(messagesFromDB)
})

// 削除の部分はまだ、未完成
const deleteAtRow = (target) => {
    document.getElementsById("brainstorm").removeChild(target.parentNode)
}

function displayMessages(allMessageArray) {

    // liを配列として使う方法がわからなく いちいちliを生成して入れる方法にした
    for (let i = 0; i < allMessageArray.length; i++) {
        createMessageRow(allMessageArray[i])
    }

}

function createMessageRow(message) {
    const div = document.createElement("div")
    // css class nameを作成するといいかも！
    div.className = "list-row"
    const li = document.createElement("li")
    li.innerText = message

    const deleteButton = document.createElement("button")
    deleteButton.innerText = "Delete"
    deleteButton.addEventListener("click", () => {
        // 親ノードの削除 -> li削除
        deleteAtRow(deleteButton.parentNode)
    })

    li.appendChild(deleteButton)
    div.appendChild(li)
    document.getElementById("brainstorm").appendChild(div)
}

// 使うかどうかはわからん
// delete button


// // firestoreからデータを削除する
// const onDeleteClick = (e) => {
//     const targetID = e.target.id;

//     // dbServiceの brainstorm　collectionにあった該当のidを削除する
//     db.collection("brainstorm").doc(`${targetID}`).delete();

//     // 削除したため、新しくtextsを画面に描く
//     displayMessages

// };

// 出力するdiv要素
// allTextsという名前は任意である
// テキストcollection 指定: brainstorm

// firestoreを読み込んで、dbServiceという変数に入れる
// dbServiceを通して、firestoreの動作 (修正, 追加, 削除)ができる
// const dbService = firebase.firestore();

// // MARK: Firestoreのリアルタイムデータ感知

// // 設定したcollectionの名からデータの変更を感知
// // テキストcollection: brainstorm
// db.collection("brainstorm").onSnapshot((snapshot) => {
//     // textArrに文書のデータとidを保存
//     textArr = snapshot.docs.map((doc) => ({
//         ...doc.data(), id: doc.id,
//     }));
//     // メッセージを画面に表示する間数呼び出し
//     presentingData();
// });

// メッセージを画面に表示する間数


// const presentingData = () => {
//     //既存のデータ持ってくる いらないかも
//     const getPreviousMsg = await getMsgInfo(roomID_);
//     console.log(getPreviousMsg);
//     // ul (・ でできるリスト) 要素生成
//     const ul = document.createElement("ul");
//     const li = document.createElement("li");
//     ul.appendChild(li);

//     getPreviousMsg.forEach((text) => {
//         allTexts.appendChild(text).msg;
//         allTexts.appendChild(text).size
//         allTexts.appendChild(text).index;
//     });

    // // map間数を用いて textArrのすべての要素を繰り返して持ってくる
    // // 繰り返す度に 一個の要素に tが入ることになる
    // textArr.map((t) => {
    //     // li(ul の中に入る list 要素)と　button 要素生成 
    //     const li = document.createElement("li");
    //     const btn = document.createElement("button");

    //     // // liというtagの中に mainThemeの内容が入る
    //     // li.innerText = `${t.mainTheme}`;

    //     // button tagの中に deleteが入る (削除)
    //     btn.innerText = "delete";

    //     // buttonがクリックされた時、間数の発生 -> Event Listener
    //     // button Click? -> onDeleteClick 呼び出し
    //     btn.addEventListener("click", onDeleteClick);

    //     //btnのID : mainThemeのidに設定 (任意)
    //     // 理由: 削除作業は idが必要だから
    //     btn.id = `${t.id}`;

    //     // li に btnを、ul に liを　入れる
    //     li.appendChild(btn);
    //     ul.appendChild(li);
    // });
// };