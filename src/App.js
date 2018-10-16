import React from 'react';
import CreateRoom from './components/CreateRoom';
import MessageList from './components/MessageList';
import RoomList from './components/RoomList';
import Chatkit from '@pusher/chatkit';
import SendMessage from './components/SendMessage';
import {tokenUrl, instanceLocator } from './config'

import './App.css';

class App extends React.Component {

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
        instanceLocator,
        userId: 'Pawcio',
        tokenProvider: new Chatkit.TokenProvider({
            url: tokenUrl
        })
    })

    chatManager.connect()
    .then(currentUser => {
        currentUser.subscribeToRoom({
            roomId: 18415190,
            hooks: {
              onNewMessage: message => {
                  console.log('message.text: ', message.text);
              }
          }
                
            })
        })
    }






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