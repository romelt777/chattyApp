import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';
import DisplayImage from './DisplayImage.jsx';

class MessageList extends Component{
  render(){
    //mapping through array of objects, then sending each object to <message> as a prop.
    const messages = this.props.messages.map((message) => {
      //only sending message to <Message /> component if the type is an incoming message.
      console.log(message.image);
      if(message.type === 'incomingMessage' && !(message.image)){
        return(
          //setting the id to the key, keys are needed in React.
          <Message key={message.id} message={message} />
        );
      } else if(message.type === 'incomingNotification'){
        return(
          <Notification key={message.id} message={message} />
        );
      } else if(message.image){
        return(
          <DisplayImage key={message.id} message={message} />
        );
      }
    });


    return (
      <main className="messages">
          {messages}
      </main>

    );
  }

}



export default MessageList;