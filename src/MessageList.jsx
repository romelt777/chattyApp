import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component{
  render(){
    return (
      <main className="messages">
        <div className="message">
          <Message />
        </div>
      </main>

    );
  }

}




export default MessageList;