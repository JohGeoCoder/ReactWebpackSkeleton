import React from 'react'
import { Link } from 'react-router'

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

	render: function() {
		var adminLink = null;
		if(this.state.isAuthenticated){
			adminLink = <li><Link {...this.props} activeClassName="active"/></li>
		}

		return adminLink
	}
})
