import React, {Component} from 'react';

class Navbar extends Component{
  render(){
    return (
      <nav className='navbar'>
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="navbar-users-logged">892 users online</span>
      </nav>
    );
  }


}


export default Navbar;