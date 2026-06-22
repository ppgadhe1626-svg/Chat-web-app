import React from 'react'
import "../Styles/User_Card.css"

const User_Card = (props) => {
  // Handle checkbox selection
  const handleCheckboxChange = (userId, isChecked) => {
      if (isChecked) {
          // Add user ID to selectedUsers if checkbox is checked
          props.usr_arr((prev) => [...prev, userId]);
      } else {
          // Remove user ID from selectedUsers if checkbox is unchecked
          props.usr_arr((prev) => prev.filter((id) => id !== userId));
      }
  };

  return (
    <div className='chart-card' >
      <div className='chat-person-icon'></div>
      <div className='chat-name-and-last-message'>
        <div className='chat-name'>{props.user.name}</div>
        <div className='chat-last-message'>{props.user.email}</div>
      </div>
      <div className='chat-last-seen-and-num-notification'>
        <input type='checkbox' onChange={(e) => handleCheckboxChange(props.user._id, e.target.checked)}/>
        {/* <div className='chat-last-seen'>{props.last_seen}</div> */}
        {/* <div className='chat-num-notification'>{props.num_notification}</div> */}
      </div>
    </div>
  )
}

export default User_Card
