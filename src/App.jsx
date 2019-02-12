import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name:'Anonymous'},
      messages: [
        {
          type: "incomingMessage",
          id: "888",
          content: "I won't be impressed with technology until I can download food.",
          username: "Anonymous1"
        },
        {
          type: "incomingNotification",
          id: "889",
          content: "Anonymous1 changed their name to nomnom",
        },
        {
          type: "incomingMessage",
          id: "890",
          content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
          username: "Anonymous2"
        },
        {
          type: "incomingMessage",
          id: "891",
          content: "...",
          username: "nomnom"
        },
        {
          type: "incomingMessage",
          id: "892",
          content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
          username: "Anonymous2"
        },
        {
          type: "incomingMessage",
          id: "893",
          content: "This isn't funny. You're not funny",
          username: "nomnom"
        },
        {
          type: "incomingNotification",
          id: "894",
          content: "Anonymous2 changed their name to NotFunny",
        },
      ]
    }

    this.setUser = this.setUser.bind(this);
    this.getMessage = this.getMessage.bind(this);
  }

  componentDidMount(){
    console.log('componentDidMount <App />');

    setTimeout(() => {
      console.log('simulating incoming message');

      const newMessage = {id: 3, username: 'Michelle', content: 'Hello There!', type: "incomingMessage"};
      const messages = this.state.messages.concat(newMessage);

      this.setState({messages:messages});
    }, 3000);


  }


  setUser(user){
    console.log(`${user}`);
    this.setState({currentUser: {name: `${user}`} }, () => {
      console.log(this.state);
    });
  }

  // generateRandom(){

  // }

  getMessage(message){
    console.log('1', message);
    console.log(this.state.currentUser.name);

    const newMessage = [{
      type: "incomingMessage",
      content: `${message}`,
      username: `${this.state.currentUser.name}`
    }];

    const oldMessages = this.state.messages;

    Array.prototype.push.apply(oldMessages, newMessage);
    console.log(oldMessages);
    console.log(newMessage);

    this.setState({messages: oldMessages})

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
