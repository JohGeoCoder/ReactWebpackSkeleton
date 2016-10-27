import React from 'react'
import NavLink from './NavLink'
import AdminNavLink from './AdminNavLink'
import { browserHistory } from 'react-router'

export default React.createClass({
  getInitialState: function(){
    return {
      'isAuthenticated' : false,
      'user' : null
    }
  },

  componentDidMount: function() {
    var me = this;
    ProjectName.LoginModule.GetLoginStatus(this, function(response){
      me.setState(response);
    });
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  logout: function(){
    ProjectName.LoginModule.Logout(function(response){
      console.log("Logged Out");
      if(response.success){
        browserHistory.push('/')
        location.reload();
      }
      
    })
  },

  render: function() {
    var logoutButton = null;
    if(this.state.isAuthenticated){
      logoutButton = <li><button onClick={this.logout}>Log Out</button></li>
    }

    return (
      <div>
        <h1></h1>
        <ul role="nav">
          <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/repos">Repos</NavLink></li>
          <li><NavLink to="/message">Message</NavLink></li>
          <li><NavLink to="/login">Log In</NavLink></li>
          <li><NavLink to="/signup">Sign Up</NavLink></li>
          <AdminNavLink to="/admin">Admin Page</AdminNavLink>
          {logoutButton}
        </ul>
        {this.props.children}
      </div>
    )
  }
})
