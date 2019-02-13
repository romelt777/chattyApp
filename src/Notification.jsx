import React, {Component} from 'react';

class Notification extends Component{
  render(){
    return (
      <div className="message" >
        <span className="message-username notification">{this.props.message.username}</span>
        <span className="message-content notification">{this.props.message.content}</span>
      </div>
    );
  }
}

export default Notification;