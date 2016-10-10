import React from 'react'

export default React.createClass({

  getInitialState: function() {
    return {
      message: ""
    };
  },

  componentDidMount: function() {
    var me = this;
    var xhr = new XMLHttpRequest();
    me.serverRequest = xhr;

    xhr.open('GET', 'http://localhost:8080/api/data');
    xhr.send(null);

    xhr.onreadystatechange = function () {
      var DONE = 4; // readyState 4 means the request is done.
      var OK = 200; // status 200 is a successful return.
      if (xhr.readyState === DONE) {
        if (xhr.status === OK) {
          var response = JSON.parse(xhr.responseText);
          me.setState({
            message: response.message
          });
        } else {
          console.log('Error: ' + xhr.status); // An error occurred during the request.
        }
      }
    }
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      <div>
        <h2>Message</h2>
        <p>Yay! Wassup? {this.state.message}</p>
        {this.props.children}
      </div>
    )
  }
})
