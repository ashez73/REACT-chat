import React from 'react';
class MessageList extends React.Component {
  render() {
      return (
        <div className="message-list">
        {this.props.messages.map((message, index) => {
            return (
                <div key = {index}>
                <div>{message.text}</div>
                <div>{message.senderId}</div>
                </div>
            )
        })}
    </div>
      )
  }
}
export default MessageList