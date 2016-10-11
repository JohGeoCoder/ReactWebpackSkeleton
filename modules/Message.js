import React from 'react'

export default React.createClass({

  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    var me = this;
    ProjectName.MessagePage.GetMessage(this, function(response){
      me.setState(response);
    });
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      <div>
        <h2>Message</h2>
        <p>Yay! Wassssssup? {this.state.exampleString}</p>
        {this.props.children}
      </div>
    )
  }
})
