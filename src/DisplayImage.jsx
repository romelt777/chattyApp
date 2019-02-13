import React, {Component} from 'react';

class DisplayImage extends Component{
  render(){
    return (
      //using props from <MessageList /> to output content and username.
      <div className="message" >
        <span className="message-username">{this.props.message.username}</span>
        <span className="message-content"><img src={this.props.message.content}></img></span>
      </div>
    );
  }
}

export default DisplayImage;