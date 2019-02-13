import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name:'Anonymous'},
      socket: {},
      messages: []
    }

    this.setUser = this.setUser.bind(this);
    this.getMessage = this.getMessage.bind(this);
  }

  componentDidMount(){
    console.log('componentDidMount <App />');
//connecting to websocket server (chattyserver)
    const chattySocket = new WebSocket('ws:localhost:3001', ["protocolOne", "protocolTwo"]);
    chattySocket.onopen = function(event) {
      // console.log(event);
      console.log('Connected to server');
    }
    this.setState({socket:chattySocket}, () => {
      console.log(this.state.socket);
    });

//simulating loading a tweet.
    setTimeout(() => {
      console.log('simulating incoming message');
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello There!', type: "serverMessage"};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages:messages});
    }, 3000);
  }



//dynamically sets the typed user to the State.
  setUser(user){
    console.log(`${user}`);
    this.setState({currentUser: {name: `${user}`} }, () => {
      console.log(this.state);
    });
  }

//random string for the id of each  new message.
  // generateRandomString() {
  //   const list = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //   let randomString = "";
  //   let randomNumber = 0;

  //   for(let i = 0; i < 6; i++){
  //     //62 characters * math.random between 0-1, math floor returns largest integer.
  //     randomNumber = Math.floor(62 * Math.random());
  //     randomString += list[randomNumber];
  //   }
  //   return randomString;
  // }

//method which is called after pressing enter. called by chatbar component.
  getMessage(message){
    console.log('1', message);
    console.log(this.state.currentUser.name);
    // let randomId = this.generateRandomString();

//creating new message object with newly inputed data. Created an array with an object.
    const newMessage = [{
      type: "sendMessage",
      content: `${message}`,
      username: `${this.state.currentUser.name}`,
      // id: `${randomId}`
    }];

    const oldMessages = this.state.messages;

    //combining two arrays. old message and the new message.
    Array.prototype.push.apply(oldMessages, newMessage);
    console.log(oldMessages);
    console.log(newMessage);

//set the new state with old messages plus the new one.
    this.setState({messages: oldMessages})


    //sending message to websocket server .
    const serverMessage = JSON.stringify(newMessage);
    console.log(this.state.socket);
    this.state.socket.send(serverMessage);
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} setUser={this.setUser} getMessage={this.getMessage}/>
      </div>
    );
  }
}
export default App;
