import React from 'react'

export default React.createClass({
	getInitialState: function(){
		return {

		};
	},

	handleChange: function(event){
		if(this.props.onChange){
			this.props.onChange(event)
		}
	},

	handleBlur: function(){

	},

	render : function() {
		if(this.props.isPassword){
			return(
				<div>
					<input type="password"
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						value={this.props.value} />
				</div>
			)
		}

		if(this.props.textArea){
			return (
				<div>
					<textarea
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						value={this.props.value} />
				</div>
			)
		} else{
			return (
				<div>
					<input type="text"
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						value={this.props.value} />
				</div>
			)
		}
	}
})
