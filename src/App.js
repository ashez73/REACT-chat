import React, { Component } from 'react';
import CreateRoom from './components/CreateRoom';
import MessageList from './components/MessageList';
import RoomList from './components/RoomList';
import Chatkit from '@pusher/chatkit';
import SendMessage from './components/MessageList';


import './App.css';

class App extends React.Component {
  render() {
      return (
          <div className="app">
              <RoomList />
              <MessageList />
              <SendMessage />
              <CreateRoom />
          </div>
      );
  }
}

export default App