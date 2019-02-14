import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name:'Anonymous'},
      lastUser:{name:''}, //the last user who sent a message using the this.socket (current user)
      socket: {},
      messages: [],
      sentMessages: 0, //keeping track if this.socket has sent any messages
      numberUsers: 0, //how many users online
    }
    //binding functions to App conponent
    this.setUser = this.setUser.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.checkUrl = this.checkUrl.bind(this);
  }

  componentDidMount(){
    console.log('componentDidMount <App />');
    //connecting to websocket server (chattyserver)
    const chattySocket = new WebSocket('ws:localhost:3001', ["protocolOne", "protocolTwo"]);
    chattySocket.onopen = function(event) {
      console.log('Connected to server');
    }
    this.setState({socket:chattySocket}, () => {
      //listening to data sent by server.
      this.state.socket.onmessage = (event) => {
        //converting data type
        const data = JSON.parse(event.data);

        //checking if incoming data from server is notification or message
        if(data[0].type === 'incomingMessage' || data[0].type === 'incomingNotification' ){
          this.getMessage(JSON.parse(event.data));
        } else { //this is for receiving how many users online from the server .
          this.setState({numberUsers: data[0].content});
        }
      }
    });
    //simulating loading a tweet.
    setTimeout(() => {
      console.log('simulating incoming message');
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello There!', type: "incomingMessage", image:false};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages:messages});
    }, 3000);
  }//end of componentDidMount

  //current user in the state, is changed on every key stroke. this is the method called by <ChatBar />
  setUser(user){
    if(user === ''){
      this.setState({currentUser: {name: `Anonymous`} });
    } else {
      this.setState({currentUser: {name: `${user}`} });
    }
  }

  //checking whether entered url is an image/gif/jpeg ..etc.
  checkUrl(content, callback){
    const image = new Image();
    image.onload = function() {callback(true)};  //if image has finished loading, this callback is called, with true
    image.onerror = function() {callback(false)}; //if error occurs when loading url this callback is called, with false
    image.src = content;
  }

  getMessage(message){
    const oldMessages = this.state.messages; //previous array of messages/notifications
    let urlExists = false;
    this.checkUrl(message[0].content, (exists) => {
      urlExists = exists;
      message[0].image = urlExists; //setting whether the incoming message from server has a Url of image .

      //combining two arrays. old message and the new message.
      Array.prototype.push.apply(oldMessages, message);

      //set the new state with old messages plus the new one.
      this.setState({messages: oldMessages}) //old messages now contains previous messages plus the new message.
    })
  }

  //method which is called after pressing enter. called by chatbar component.
  sendMessage(message){
    //checking whether the user of the last sent message is the same as the current user sending a message.
    //also must check whether a user has sent a message, because the first username is null.
    if((this.state.sentMessages) > 0 && !(this.state.currentUser.name === this.state.lastUser.name)){
      //sending a notification to the server, that the current user has changed their name.
      const newNotification = [{
        type: "postNotification",
        content: `${this.state.lastUser.name} has changed their name to ${this.state.currentUser.name}`,
      }];
      this.state.socket.send(JSON.stringify(newNotification));
    }

    //added a timeout on the sending a message, because sometimes, maybe 33% notification comes after message
    setTimeout(() => {
      //creating new message array, with newly inputed data. Created an array with an object.
      const newMessage = [{
        type: "postMessage",
        content: `${message}`,
        username: `${this.state.currentUser.name}`,
      }];

      //sending message to websocket server .
      const serverMessage = JSON.stringify(newMessage);
      this.state.socket.send(serverMessage);
    }, 50)

    //updating the state of last username used to sent a message. also how many messages this client has sent.
    const messageCount = (this.state.sentMessages + 1 );
    this.setState({lastUser: {name: `${this.state.currentUser.name}`}, sentMessages : messageCount});
  }
  //sending props to child components. Navbar is receiving how many users logged in. Message list is receiving entire message array
  //chat bar is receiving the current user, and methods to call when messages are inputed.
  render() {
    return (
      <div>
        <Navbar numberUsers={this.state.numberUsers}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} setUser={this.setUser} sendMessage={this.sendMessage}/>
      </div>
    );
  }
}

export default App;
