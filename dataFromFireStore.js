// * Function Definition * 
// Room Data Send Func: sendRoomInfo()  -> return: room Obj
// Get Room Info: getRoomInfo(roomNumber) -> return: room Obj
// Send Message Info: sendMsgInfo(messageObj) -> return: message index Num
// Get Message Info:  getMsgInfo(roomNumber) -> return: message Object

// データを画面に出力する
// 1. 該当するRoomに画面を出力
// 2. 出力Style指定
// 3. -- 途中 --

// firebase_client_libraryは任意の名前
// import firebase from "firebase_client_library";
// import "firebase/firestore";

// getRoomInfoという間数: 受信したroom num => いらないかも
const getRoomInfo = getRoomInfo(roomNum);

// room 選択
// brainStormingFormという名前は任意である
const roomID = document.querySelector("#roomID");

// mainテーマ (idで指定)設定: roomのmain話題のselect
// mainThemeという名前は任意である
const mainThemeInput = document.querySelector("#mainTheme");

// 出力するdiv要素
// allTextsという名前は任意である
// テキストcollection 指定: brainstorm
const allTexts = document.querySelector("#brainstorm");

// firestoreを読み込んで、dbServiceという変数に入れる
// dbServiceを通して、firestoreの動作 (修正, 追加, 削除)ができる
const dbService = firebase.firestore();

//既存のデータ持ってくる いらないかも
const getPreviousMsg = getMsgInfo(roomNum);

// MARK: Firestoreのリアルタイムデータ感知
// 空の配列
let textArr = [];

// 設定したcollectionの名からデータの変更を感知
// テキストcollection: brainstorm
dbService.collection("brainstorm").onSnapshot((snapshot) => {
    // textArrに文書のデータとidを保存
    textArr = snapshot.docs.map((doc) => ({
        ...doc.data(), id: doc.id,
    }));
    // メッセージを画面に表示する間数呼び出し
    presentingData();
});

// メッセージを画面に表示する間数
const presentingData = () => {

    // ul (・ でできるリスト) 要素生成
    const ul = document.createElement("ul");

    // map間数を用いて textArrのすべての要素を繰り返して持ってくる
    // 繰り返す度に 一個の要素に tが入ることになる
    textArr.map((t) => {
        // li(ul の中に入る list 要素)と　button 要素生成 
        const li = document.createElement("li");
        const btn = document.createElement("button");

        // liというtagの中に mainThemeの内容が入る
        li.innerText = `${t.mainTheme}`;

        // button tagの中に deleteが入る (削除)
        btn.innerText = "Delete";

        // buttonがクリックされた時、間数の発生 -> Event Listener
        // button Click? -> onDeleteClick 呼び出し
        btn.addEventListener("click", onDeleteClick);

        //btnのID : mainThemeのidに設定 (任意)
        // 理由: 削除作業は idが必要だから
        btn.id = `${t.id}`;

        // li に btnを、ul に liを　入れる
        li.appendChild(btn);
        ul.appendChild(li);
    });

    // li 要素が全部追加された ulを allMessagesに追加
    allTexts.appendChild(ul);


};

// 使うかどうかはわからん
// firestoreからデータを削除する
const onDeleteClick = (e) => {
    const targetID = e.target.id;

    // dbServiceの brainstorm　collectionにあった該当のidを削除する
    dbService.collection("brainstorm").doc(`${targetID}`).delete();

    // 削除したため、新しくtextsを画面に描く
    presentingData();

};