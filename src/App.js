import React from "react";
import CreateRoom from "./components/CreateRoom";
import MessageList from "./components/MessageList";
import RoomList from "./components/RoomList";
import Chatkit from "@pusher/chatkit";
import SendMessage from "./components/SendMessage";
import { tokenUrl, instanceLocator } from "./config";

import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: "Pawcio",
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    });

    chatManager.connect().then(currentUser => {
      currentUser.subscribeToRoom({
        roomId: 18415190,
        messageLimit: 20,
        hooks: {
          onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      });
    });
  }

  render() {
    console.log("this.state.messages:", this.state.messages);
    return (
      <div className="app">
        <RoomList />
        <MessageList messages={this.state.messages} />
        <SendMessage />
        <CreateRoom />
      </div>
    );
  }
}

export default App;
