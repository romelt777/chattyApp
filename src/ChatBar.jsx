import React, {Component} from 'react';

class ChatBar extends Component{
  render(){
    const submitMessage = event => {
      const content = document.getElementsByClassName('chatbar-message');
      console.log(content[0].value);
      if(event.key === 'Enter'){
        alert(content[0].value);
        content[0].value = '';
      }
    };

    const getUser = event => {
      const username = document.getElementsByClassName('chatbar-username');
      this.props.setUser(username[0].value);
    };

    return (
      <footer className="chatbar">
      <input type='text' onKeyUp={getUser} className="chatbar-username" placeholder={this.props.currentUser.name}></input>
      <input type='text' onKeyUp={submitMessage} className="chatbar-message" placeholder="Type a message and hit ENTER"></input>
      </footer>
    );
  }
}

export default ChatBar;