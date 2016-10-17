import React from 'react'
import TextInput from './text-modules/TextInput'

export default React.createClass({
	getInitialState: function(){
		return {
			username: "",
			password: ""
		}
	},

	submitLogin: function(login){
		console.log(login)

		
	},

	handleSubmit : function(e){
		e.preventDefault()

		var username = this.state.username.trim()
		var password = this.state.password.trim()

		if(!username || !password){
			return;
		}

		this.submitLogin({
			username: username,
			password: password
		});

		this.setState({
	    	username: "",
	    	password: ""
	    });
	},

	setValue: function(field, event){
		var object = {};
		object[field] = event.target.value
		this.setState(object);
	},

	render: function() {
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
		    		<TextInput value={this.state.username}
		    			elementId="form-username"
		    			labelText="Username"
		    			onChange={this.setValue.bind(this, 'username')} />
		    		<TextInput isPassword={true}
		    			elementId="form-password"
		    			labelText="Password"
		    			value={this.state.password}
		    			onChange={this.setValue.bind(this, 'password')} />
		    		<div>
		    			<button type="submit">Log In</button>
		    		</div>
				</form>
			</div>
		)
	}
})