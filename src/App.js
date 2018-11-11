import React from "react";
import CreateRoom from "./components/CreateRoom";
import MessageList from "./components/MessageList";
import RoomList from "./components/RoomList";
import Chatkit from "@pusher/chatkit";
import SendMessage from "./components/SendMessage";
import {
  tokenUrl,
  instanceLocator
} from "./config";

import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this);
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
      this.currentUser = currentUser;
      this.getRooms();

    })
      .catch(err => console.log('error on connecting: ', err))
  }

  getRooms() {
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        })
      })
      .catch(err => console.log('error on joinableRooms:', err));
  }



  subscribeToRoom(roomId) {
    this.setState({
      messages: []
    })
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      messageLimit: 20,
      hooks: {
        onNewMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          });
        }
      }
    })
      .then(room => {
        this.setState({
          roomId: room.id
        })
        this.getRooms()
      })
      .catch(err => console.log('error on subscribing to room: ', err))
  }
  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    })
  }
  render() {
    //console.log("this.state.messages:", this.state.messages);
    return (<div className="app" >
      <RoomList subscribeToRoom={this.subscribeToRoom}
        rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
      <MessageList messages={this.state.messages} />
      <SendMessage sendMessage={this.sendMessage} />
      <CreateRoom />
    </div>
    );
  }
}

export default App;