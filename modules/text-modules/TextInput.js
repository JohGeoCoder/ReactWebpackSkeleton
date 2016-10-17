import React from 'react'

import Label from './Label'

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
					<Label forId={this.props.elementId}
						labelText={this.props.labelText} />
					<input type="password"
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						value={this.props.value}
						id={this.props.elementId} />
				</div>
			)
		}

		if(this.props.textArea){
			return (
				<div>
					<Label forId={this.props.elementId}
						labelText={this.props.labelText} />
					<textarea
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						value={this.props.value}
						id={this.props.elementId} />
				</div>
			)
		} else{
			return (
				<div>
					<Label forId={this.props.elementId}
						labelText={this.props.labelText} />
					<input type="text"
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						value={this.props.value}
						id={this.props.elementId} />
				</div>
			)
		}
	}
})
