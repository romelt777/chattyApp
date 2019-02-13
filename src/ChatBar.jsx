import React, {Component} from 'react';

class ChatBar extends Component{
  render(){
    const submitMessage = event => {
      const content = document.getElementsByClassName('chatbar-message');
      //checking if enter is pressed, then passes the data to function from parent component <APP/>
      //if enter is not pressed no data is being passed.
      if(event.key === 'Enter'){
        // alert(content[0].value);
        this.props.sendMessage(content[0].value);
        content[0].value = '';
        //resets the content box to empty.
      }
    };

    //while user is dynamically typing the value in username box is being passed to parent component via method (setUser), which is props from <APP>
    const getUser = event => {
      const username = document.getElementsByClassName('chatbar-username');
      this.props.setUser(username[0].value);
      //not going to reset the username box, keeps same user so they can create more messages.
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