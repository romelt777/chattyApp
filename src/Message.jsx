import React, {Component} from 'react';

class Message extends Component{
  render(){
    return (
      //using props from <MessageList /> to output content and username.
      <div className="message" >
        <span className="message-username">{this.props.message.username}</span>
        <span className="message-content">{this.props.message.content}</span>
      </div>
    );
  }
}

export default Message;