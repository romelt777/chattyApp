import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';
import DisplayImage from './DisplayImage.jsx';

class MessageList extends Component{
  render(){
    //mapping through array of objects, then sending each object to correct component, as a prop.
    const messages = this.props.messages.map((message) => {

      //only sending data to <Message /> component if the type is an incoming message.
      if(message.type === 'incomingMessage' && !(message.image)){
        return(
          //setting the id to the key, keys are needed in React.
          <Message key={message.id} message={message} />
        );
      } else if(message.type === 'incomingNotification'){ //sending data to notification component
        return(
          <Notification key={message.id} message={message} />
        );
      } else if(message.image){ //sending data to image component.
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