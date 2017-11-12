'use strict';

const Button = document.getElementById('sendMess');
const Input = document.getElementById('mess');
const Result = document.getElementById('result');

const ws = new WebSocket('ws://192.168.31.170:1920');


ws.onopen = () => {
    write("Connected");
    console.log("Connected");
};

ws.onmessage = (event) => {
    const mess = JSON.parse(event.data);
    write(`from ${mess.user}:     ${mess.message}`);
};

ws.onerror = (err) => {
    console.log(`${err}`)
};

ws.onclose = () => {
    console.log("Closed connection")
};


Button.addEventListener('click', () => {
    const mess = Input.value;
    ws.send(mess);
});

function write(text) {
    Result.innerHTML += text + '</br>'
}
