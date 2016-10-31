import React from 'react'
import TextInput from '../utility-components/TextInput'

export default React.createClass({
	getInitialState: function(){
		return {
			username: "",
			password: "",
			csrf: ""
		}
	},

	componentDidMount: function() {
		var me = this;
		ProjectName.Utilities.SendRequest({
			url: 'api/getCsrf',
			method: 'GET'
		}, function(data){
			me.setState({
				username: me.state.username,
				password: me.state.password,
				csrf: data.csrf
			})
		})
	},

	submitLogin: function(login){
		console.log("Submitting: " + JSON.stringify(login))

		ProjectName.LoginModule.SubmitLogin(this, login, function(result){
			console.log("Returning: " + JSON.stringify(result))
			if(result.success){
				location.reload()
			}
		});
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
			password: password,
			_csrf: this.state.csrf
		});

		/*this.setState({
	    	username: "",
	    	password: ""
	    });*/
	},

	setValue: function(field, event){
		var object = {};
		object[field] = event.target.value
		this.setState(object);
	},

	render: function() {
		return(
			<div>
				<h3>Log In</h3>
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