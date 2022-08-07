//メッセージ送信関数
function clickBtn_send() {
    //t1にメッセージを入れる
    const t1 = document.getElementById("messagebox").value;
    document.getElementById("message").textContent = t1;
    //sendMsgInfo(roomID, t1);
    console.log(t1);
    t3 = document.getElementById("m_send").textContent;
    if (t3 === "編集") {
        document.getElementById("m_send").textContent = "送信"
    }
}
//メッセージ編集関数（文字がクリックされたとき）
function clickBtn_choice() {
    const t2 = document.getElementById("message").textContent;
    console.log(t2);
    document.getElementById("messagebox").value = t2;
    document.getElementById("m_send").textContent = "編集";
    document.getElementById("m_send").onclick = clickBtn_edit;

    console.log("clickBtn_edit");
}