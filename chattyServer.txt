const express = require('express');
const SocketServer = require('ws').Server;

//importing uuid which generates a unique id, which cannot ever be duplicated.
const uuidv4 = require('uuid/v4');

const PORT = 3001;

//creating a new express server.
const server = express()
  //express server serving static assets from the public folder.
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on port ${ PORT }`));

//creating websocket server
const wss = new SocketServer({server});
//global variable for outgoing data.
let outgoingData = [];



// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the connection parameter in the callback.
wss.on('connection', (connection) => {
  console.log('Client Connected');

  outgoingData = [{
    content:(wss.clients).size,
    type:'incomingUserData'
  }]

  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(outgoingData),() => {
      console.log('message sent to client');
    });
  })

  //recieving message from client side.
  connection.on('message', ((message) => {
    const clientMessage = JSON.parse(message);
    //checking if incoming data from client app is a message.
    if(clientMessage[0].type === 'postMessage'){
      //setting new message to send to clients, given new ID using UUID and type is changed.
      outgoingData = [{
        content:clientMessage[0].content,
        username:clientMessage[0].username,
        id: uuidv4(),
        type:'incomingMessage'
      }]

      //websockets keeps track of clients connected automatically, sending message to all.
      //why not work if outside?
      wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(outgoingData),() => {
          console.log('message sent to client');
        });
      }) //checks if incoming data is a notification.
    } else if(clientMessage[0].type === 'postNotification'){
        outgoingData = [{
          content:clientMessage[0].content,
          username:'NOTIFICATION',
          id: uuidv4(),
          type:'incomingNotification'
        }]

        wss.clients.forEach(function each(client) {
          client.send(JSON.stringify(outgoingData),() => {
            console.log('notification sent to client');
          });
        })
      }
  }));

  //when a connection closes, the number of users online are resent to the connected clients.
  connection.on('close', () => {
    console.log('Client Disconnected');
    outgoingData = [{
      content:(wss.clients).size,
      type:'incomingUserData'
    }]

    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(outgoingData),() => {
        console.log('message sent to client');
      });
    })
  });
});