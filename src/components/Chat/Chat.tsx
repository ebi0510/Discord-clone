import React, { useEffect, useState } from 'react'
import './Chat.scss'
import ChatHeader from './ChatHeader.tsx'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ChatMessage from './ChatMessage.tsx';
import { useAppSelector } from '../../app/hooks.ts';
import { collection, CollectionReference,DocumentData, DocumentReference, serverTimestamp,addDoc, onSnapshot, Timestamp, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase.ts";
import useSubCollection from '../../hooks/useSubcollection.tsx';



function Chat() {
  const [inputText, setInputText] = useState<string>("");
  const channelName = useAppSelector((state) => state.channel.channelName);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const user = useAppSelector((state) => state.user.user);
  const { subDocuments: messages } = useSubCollection("channels", "messages")


  const sendMessage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    // channelsコレクションの中のmessageコレクションの中にメッセージ情報を入れる
     const collectionRef: CollectionReference<DocumentData> = collection(
      db, 
      "channels", 
      String(channelId), 
      "messages");

      const docRef: DocumentReference<DocumentData> =  await addDoc(collectionRef, {
        message: inputText,
        timestamp: serverTimestamp(),
        user: user,
      });
      setInputText("");
  };

  return (
    <div className='chat'>
      {/* Chatheader */}
      <ChatHeader channelName={channelName}/>
      {/* chatmessage */}
      <div className='chatMessage'>
        {messages.map((message,index)=>(
          <ChatMessage 
          key={index} 
          message={message.message} 
          timestamp={message.timestamp}
          user={message.user}/>
        ))};
      </div>
      {/* chatInput */}
      <div className='chatInput'>
        <AddCircleOutlineIcon/>
        <form>
            <input 
            type='text' 
            placeholder='#Udemyへメッセージを送信' 
            onChange={(e: React.ChangeEvent) => 
            setInputText(e.target.value)
          }
          value={inputText}
            ></input>
            <button type='submit' className='chatInputButton' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => sendMessage(e)}>
                送信
            </button>
        </form>

        <div className='chatInputIcons'>
            <CardGiftcardIcon/>
            <GifIcon/>
            <EmojiEmotionsIcon/>
        </div>
      </div>
    </div>
  )
}

export default Chat
