const WebSocket = require('ws');
const wsS = new WebSocket.Server({port: 1920});


let clients = [];
let count = 1;


wsS.on('connection', ws => {
    console.log(`Connected ${count}`);

    /*clients.forEach(client => {
        client.ws.send(`Client connected ${count}`)
    });*/

    const client = {ws, id: count++};
    clients.push(client);

    ws.on('message', data => {
        clients.forEach(cl => {
            cl.ws.send(JSON.stringify({
                user: client.id,
                message: data
            }))
        });
    });

    ws.on('close', () => {
        exterminate(ws);
    });
});


function exterminate(ws) {
    clients.forEach((client, i) => {
        if (client.ws === ws) {
            clients.splice(i, 1);
            console.log("user disconnected");
        }
        else {
            client.ws.send("user disconnected");
        }
    })
}
