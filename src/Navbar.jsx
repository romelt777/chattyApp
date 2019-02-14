import React, {Component} from 'react';

class Navbar extends Component{
  //navbar using props from the app component to display how many users are currently online.
  render(){
    return (
      <nav className='navbar'>
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="navbar-users-logged">{this.props.numberUsers} users online</span>
      </nav>
    );
  }
}

export default Navbar;