import React, { useState } from 'react';
import SockJsClient from 'react-stomp';
import chatAPI from '../services/chatapi';
import { randomColor } from '../util/common';
import Input from './Input/Input';
import Messages from './Messages/Messages';

// 1. ONLY users you should see in chat are those who you are scheduled with !!
// 2. Add User list from chat-ws-client , jasofalcon
// 3. JWT to keep user persistence

const SOCKET_URL = 'http://localhost:8080/ws-chat/';

const Chat2 = (props) => {

  const [messages, setMessages] = useState([])
  const [user, setUser] = useState(null)
  const currentUser = props.username;
  
  
  let onConnected = () => {
    setUser({
        username: currentUser,
        color: randomColor()
    })
    console.log("Connected!!")
  }

  let onMessageReceived = (msg) => {
    console.log('New Message Received!!', msg);
    setMessages(messages.concat(msg));
  }

  let onSendMessage = (msgText) => {
    chatAPI.sendMessage(user.username, msgText).then(res => {
      console.log('Sent', res);
    }).catch(err => {
      console.log('Error Occured while sending message to api');
    })
  }

  return (

    <div className="complete-chat-route">

      {/* <div className="chat-user-list">    How to pull users into list? List dynamic? }
          <ul className="ul-chat-user-list" style={{background: "#9932CC", color: "#f1356d"}}>
            <h3 style={{color: "#f1356d"}}>{"Users"}</h3>  How to center Users ? 
            <li>
              {"bill490"}  
            </li>
            <li>
              {"tom123"}  
            </li>     
          </ul>

           make call to backend, who are you scheduled with ?  
        */}

      <div className="ChatRoom">       
            
              <SockJsClient
                url={SOCKET_URL}
                topics={['/topic/group']}
                onConnect={onConnected}
                onDisconnect={console.log("Disconnected!")}
                onMessage={msg => onMessageReceived(msg)}
                debug={false}
              />
              
                <Messages
                  messages={messages}
                  currentUser={user}
                />
              <Input onSendMessage={onSendMessage} />
              
            
      </div>

    </div>
  )
}

export default Chat2;
