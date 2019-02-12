import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component{
  render(){
    const messages = this.props.messages.map((message) => {
      if(message.type === 'incomingMessage'){
        return(
          <div className="message">
            <span className="message-username">{message.username}</span>
            <span className="message-content">{message.content}</span>
          </div>
        );
      }
    });


    return (
      <main className="messages">
          {messages}
          <Message />
      </main>

    );
  }

}



export default MessageList;