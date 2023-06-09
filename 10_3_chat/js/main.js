window.addEventListener("DOMContentLoaded", () => {
    const wsURI = "wss://echo-ws-service.herokuapp.com";
    const chat = document.querySelector('.chat');
    const sendBtn = document.querySelector('#send');
    const closeBtn = document.querySelector(".close");
    const openChatBtn = document.querySelector("#openChat");
    const geoBtn = document.querySelector("#geo");
    let websocket;

    openChatBtn.addEventListener("click", () => {
        document.querySelector(".window").style.display = "block";
        openChatBtn.style.display = "none";
        setTimeout(openSocket, 3000);
        setTimeout(writeToScreen("Оператор подключается к чату..", "system"), 1000);
    })

    function writeToScreen(message,from) {
        let pre = document.createElement("p");
        pre.className = "msg " + from + "__msg"
        pre.innerHTML = message;
        chat.appendChild(pre);
    }
    function openSocket() {
        websocket = new WebSocket(wsURI);
        websocket.onopen = function (evt) {
            writeToScreen("Оператор на связи", "system");
        }
        websocket.onclose = function (evt) {
            writeToScreen("Оператор покинул чат", "system");
        }
        websocket.onmessage = function (evt) {
            writeToScreen(evt.data, "server");
        }
        websocket.onerror = function (evt) {
            writeToScreen(evt.data, "system");
        }
    }
    function closeSocket() {
        websocket.close();
        websocket = null;
        document.querySelector(".window").style.display = "none";
        openChatBtn.style.display = "block";
        chat.innerHTML = "";
    }

    sendBtn.addEventListener('click', () => {
        const inputMsg = document.querySelector('#msg__field');
        const message = inputMsg.value;
        console.log(message);
        writeToScreen(message, "client");
        websocket.send(message);
        inputMsg.value = "";
    })
    function success(position) {
        let map = document.createElement('a')
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        map.href=`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        map.target = "_blank"
        map.innerHTML = "&#128205; <i>Ваше местоположение</i>";
        map.style.color = "#0000ff";
        map.style.marginTop = "10px";
        map.className = "msg server__msg";
        chat.appendChild(map);
    }
    
    function error() {
        writeToScreen("Невозможно получить ваше местположение","server");
    }

    function geoLocationMessage() {
        if(!navigator.geolocation) {
            writeToScreen("Геолокация не поддержиается браузером", "system");
        } else {
            writeToScreen("Определяем ваше местоположение", "system");
            navigator.geolocation.getCurrentPosition(success, error)
        }

    }


    geoBtn.addEventListener('click', geoLocationMessage)
    closeBtn.addEventListener('click', closeSocket);
})