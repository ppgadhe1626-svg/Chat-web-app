import React, { useContext } from 'react'
import "../Styles/Chatting_Box.css"
import { UserContext } from '../Context';

const Chatting_Box = (props) => {
  // console.log(props.message.message)
  const { id } = useContext(UserContext);
  // Create a Date object from the timestamp
const date = new Date(props.message.sentTime);

// Get hours and minutes
const hours = date.getUTCHours().toString().padStart(2, '0'); // Convert to 2 digits
const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // Convert to 2 digits

// Combine hours and minutes to form hh:mm
const time = `${hours}:${minutes}`;

  // console.log(props.message.sentTime)
  // console.log(props.message.sender, id)
  return (
    <div className={`chatting-box ${props.message.sender == id ? 'chat-right':'chat-left'}`}>
       <div className='chatting-box-message'> {props.message.message} </div>
       <div className='chatting-box-message-time'> {time}</div>
    </div>
  )
}

export default Chatting_Box
