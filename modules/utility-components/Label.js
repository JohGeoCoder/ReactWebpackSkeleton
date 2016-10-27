import React from 'react'

/*
	PROPS
	forId
	labelText
*/

export default React.createClass({
	getInitialState: function(){
		return {

		}
	},

	render: function(){
		if(this.props.labelText){
			return(
				<div>
					<label htmlFor={this.props.forId}>{this.props.labelText}</label>
				</div>
			)
		}
	}
})