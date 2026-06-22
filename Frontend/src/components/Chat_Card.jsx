import React, { useContext, useEffect, useState } from 'react';
import "../Styles/Chat_Card.css";
import { UserContext } from '../Context';
import axios from 'axios';

const Chat_Card = (props) => {
  const { id } = useContext(UserContext);
  // console.log(props.chatInfo);
  const members = props.chatInfo.members;
  const [chatName, setChatName] = useState(""); // State to store the chat name

  // Fetch the username when the component mounts or when members change
  useEffect(() => {
    async function fetchChatName() {
      if (props.chatInfo.isGroupChat) {
        setChatName(props.chatInfo.chatname); // Set group chat name
      } else {
        const user_id = members.find((_id) => _id !== id); // Find the other user's ID
        if (user_id) {
          try {
            const response = await axios.get(`http://localhost:8000/user/user_profile/${user_id}`);
            // console.log(response.data)
            setChatName(response.data.message.name); // Set the fetched username
          } catch (error) {
            console.error("Error fetching username:", error);
          }
        }
      }
    }

    fetchChatName();
  }, [members, props.chatInfo.isGroupChat, id]); // Dependencies for useEffect

  return (
    <div className='chart-card' onClick={() => { props.setSelectedChat(props.chatInfo); }}>
      <div className='chat-person-icon'></div>
      <div className='chat-name-and-last-message'>
        <div className='chat-name'>{chatName}</div>
        <div className='chat-last-message'>{props.chatInfo.last_message}</div>
      </div>
      <div className='chat-last-seen-and-num-notification'>
        <div className='chat-last-seen'>{props.chatInfo.last_seen}</div>
        <div className='chat-num-notification'>{props.chatInfo.num_notification}</div>
      </div>
    </div>
  );
};

export default Chat_Card;
