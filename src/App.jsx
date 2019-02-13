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
    this.sendMessage = this.sendMessage.bind(this);
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
      //listening to messages sent by server.
      this.state.socket.onmessage = (event) => {
        console.log('where', JSON.parse(event.data));
        this.getMessage(JSON.parse(event.data));
      }
    });

//simulating loading a tweet.
    setTimeout(() => {
      console.log('simulating incoming message');
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello There!', type: "serverMessage"};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages:messages});
    }, 3000);
  }//end of componentDidMount


//dynamically sets the typed user to the State.
  setUser(user){
    console.log(`${user}`);
    this.setState({currentUser: {name: `${user}`} }, () => {
      console.log(this.state);
    });
  }

  getMessage(message){
    console.log('hey', message);
    const oldMessages = this.state.messages;

    //combining two arrays. old message and the new message.
    Array.prototype.push.apply(oldMessages, message);
    console.log(oldMessages);
    console.log(message);

  //set the new state with old messages plus the new one.
    this.setState({messages: oldMessages})

  }

//method which is called after pressing enter. called by chatbar component.
  sendMessage(message){
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

    //sending message to websocket server .
    const serverMessage = JSON.stringify(newMessage);
    console.log(this.state.socket);
    this.state.socket.send(serverMessage);
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} setUser={this.setUser} sendMessage={this.sendMessage}/>
      </div>
    );
  }
}
export default App;
