import React from "react";

class SendMessage extends React.Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };
  }

  handleChange = e => {
    this.setState({
      message: e.target.value
    });
  };

  handleForm = e => {
    e.preventDefault();
    console.log(`sending: ${this.state.message}`);
    console.log(this.props);
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ''
  })
  };

  render() {
    //console.log(this.state.message);
    return (
      <form onSubmit={this.handleForm} className="send-message-form">
        <input
          onChange={this.handleChange}
          value={this.state.message}
          placeholder="Type message and hit enter"
          type="text"
        />
      </form>
    );
  }
}

export default SendMessage;
