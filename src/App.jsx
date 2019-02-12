import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name:'Anonymous'},
      messages: [],
    }

    this.setUser = this.setUser.bind(this);
  }

  setUser(user){
    console.log(`${user}`);
    this.setState({currentUser: {name: `${user}`} }, () => {
      console.log(this.state);
    });
  }

  render() {
    return (
      <div>
        <MessageList />
        <ChatBar currentUser={this.state.currentUser} setUser={this.setUser}/>
      </div>
    );
  }
}
export default App;
