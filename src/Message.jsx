import React, {Component} from 'react';

class Message extends Component{
  render(){
    return (
      <main className="messages">
        <div className="message">
          <span className="message-username">Anonymous1</span>
          <span className="message-content">I won't be impressed with technology until I can download food.</span>
        </div>
      </main>
    );
  }
}

export default Message;