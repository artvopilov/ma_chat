const WebSocket = require('ws');
const config = require('config');

const wsS = new WebSocket.Server({port: config.get('server.port')});


const clients = [];
let count = 1;

wsS.on('connection', ws => {

    let currCount = count++;
    console.log(`User ${currCount} connected`);
    let client;

    ws.on('message', message => {
        const messJson = JSON.parse(message);
        if (messJson.type === "login") {

            ws.send(JSON.stringify({
                user: messJson.data,
                message: "Authorization"
            }));

            client = {ws, id: currCount, username: messJson.data};
            console.log(`User ${client.username} logged in`);

            broadcast(client, "Connected");
            clients.push(client);
        }
        else if (messJson.type === "logout") {
            ws.send(JSON.stringify({
                message: "UnAuthorization"
            }));
            exterminate(client);
        }
        else {
            broadcast(client, messJson.data)
        }

    });

    ws.on('close', () => {
        exterminate(client)
    });
});


function broadcast(client, data) {
    clients.forEach(cl => {
        if (client.id === cl.id) {
            cl.ws.send(JSON.stringify({
                user: "You",
                message: data
            }))
        }
        else {
            cl.ws.send(JSON.stringify({
                user: client.username,
                message: data
            }))
        }
    });
}


function exterminate(cl) {
    let count = 0;
    let client;
    while (count < clients.length) {
        client = clients[count];
        if (client === cl) {
            clients.splice(count, 1);
            console.log(`User ${cl.id} disconnected`);
            continue;
        }
        client.ws.send(JSON.stringify({
            user: cl.username,
            message: `Disconnected`
        }));

        count++;
    }
}
