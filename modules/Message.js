import React from 'react'

export default React.createClass({

  getInitialState: function() {
    return {
      message: "No message"
    };
  },

  componentDidMount: function() {
    this.serverRequest = $.get("http://localhost:8080/api/data", function (result) {
      this.setState({
        message: result.message
      });
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      <div>
        <h2>Message</h2>
        <p>{this.state.message}</p>
        <p>Yay! Wassup?  ddd</p>
        {this.props.children}
      </div>
    )
  }
})
