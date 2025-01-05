import React from 'react'
import { Avatar } from "@mui/material"
import "./ChatMessage.scss"
import { Timestamp } from 'firebase/firestore';

type Props = {
  timestamp: Timestamp;
  message: string;
  user:{
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
};

function ChatMessage(props: Props) {
  const { message, timestamp, user} = props;
  return (
    <div className='message'>
      <Avatar src={user?.photo}/>
      <div className='messageInfo'>
        <h4>
            {user?.displayName}
            <span className='messageTimeStamp'>{new Date(timestamp?.toDate()).toLocaleString()}</span>
        </h4>

        <p>{message}</p>
      </div>
    </div>
  )
}

export default ChatMessage
