const WebSocket = require('ws');
const wsS = new WebSocket.Server({port: 1920});


let clients = [];
let count = 1;


wsS.on('connection', ws => {
    console.log(`Connected ${count}`);

    const client = {ws, id: count++};
    broadcast(client, "Connected");
    clients.push(client);

    ws.on('message', data => {
        broadcast(client, data)
    });

    ws.on('close', () => {
        exterminate(client);
    });
});


function broadcast(client, data) {
    clients.forEach(cl => {
        cl.ws.send(JSON.stringify({
            user: client.id,
            message: data
        }))
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
            user: cl.id,
            message: `Disconnected`
        }));

        count++;
    }
}
