import React, { useEffect, useRef, useState } from 'react';
import '../styles/css/chatui.css';
import ChatHeaderComponent from './ChatHeaderComponent.tsx';
import Messageco from './Messageco.tsx'
import Sendmessage from './Sendmessage.tsx';
// import messi from '../assets/messi.jpg'
import ftlogo from '/ftlogo.png';


const Leftchat: React.FC = (props: any) => {

  // console.log("Messages isssss : ", props.messages);

  // const MessageRef = useRef(null);

  const handleMenuOptionClick = (option: string, name : string, userId : number) => {
    // Perform actions based on the selected option
    if (option === 'kick') {
      console.log("user want to kick in " + name + "user with id : " + userId);
      props.handleKick(name, userId);
    } else if (option === 'ban') {
      console.log("user want to ban in " + name + "user with id : " + userId);
      props.handleBan(name, userId);

    } else if (option === 'mute') {
      console.log("user want to mute in " + name + "user with id : " + userId);
      props.handleMute(name, userId);
    }
  };
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [boxVisibility, setBoxVisibility] = useState<{ [key: number]: boolean }>({});

  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const handleButtonClick = (buttonIndex: number) => {
    setActiveButton(buttonIndex);
    setBoxVisibility((prevVisibility: any) => ({
      ...Object.fromEntries(Object.keys(prevVisibility).map((key) => [key, false])),
      [buttonIndex]: true,
    }));
    if (activeButton === buttonIndex)
    {
      console.log(activeButton, buttonIndex);
      handleBoxClose();
    }
  };
  const handleBoxClose = () => {
    setActiveButton(null);
    setBoxVisibility({});
  };

  const handleOutsideClick = (event: MouseEvent) => {
    // Check if the click is outside the buttons and boxes
    console.log("clicked");
    if (buttonRefs.current.some((buttonRef) => buttonRef && buttonRef.isSameNode(event.target as Node))) {
      handleBoxClose();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [boxVisibility]);

  // console.log("user is owner : " + props.isOwner);

  if (props.showRoom)
  {
    // console.log("Show room called in left chat with " + props.Roomtype);
    // console.log(props.Roomtype);
    return (
      <div className="composant-gauche">
        <ChatHeaderComponent friendName={props.name} showRoom={props.showRoom} isOwner={props.isOwner} isAdmin={props.isAdmin} profileImageUrl={ftlogo}
          Roomtype={props.Roomtype} handleAdmin={props.handleAdmin}getChatUsers={props.getChatUsers} chatUsers={props.chatUsers} handleUpdateRoom={props.handleUpdateRoom} handleDisplayRoom={props.HandleDisplayRoom}
          room={props.room} handleleave={props.handleleave}/>
        <div className="msg-section">
        {props.messages.map((message: any, index: any) => (
          <div ref={(ref) => (buttonRefs.current[index] = ref)}>
              <Messageco 
              isVisible={boxVisibility[index]} 
              handleButtonClick={() => handleButtonClick(index)}
              handleBoxClose={handleBoxClose}
              key={index}
              text={message.message}
              profileImageUrl={message.user.avatar}
              isOwnMessage={message.userId === props.userid ? true : false}
              onMenuOptionClick = {handleMenuOptionClick}
              users={props.chatUsers}
              room={props.room}
              message_userId = {message.userId}
              message_id = {message.id3_chat_message}
              />
            </div>
        ))}
            </div>
        <Sendmessage onSendMessage={props.sendMessage}/>
      </div>
    );
  }
  else if (props.showDm)
  {
    // console.log("show dm called in left chat with");
    // console.log("name : " +  props.name);
    return (
      <div className="composant-gauche">
        <ChatHeaderComponent friendName={props.name} showDm={props.showDm} profileImageUrl={props.Friends.find((friend: any) => friend.username === props.name)?.avatar || ftlogo} />
        <div className="msg-section">
        {props.messages.map((message: any, index: any) => (
            <Messageco 
            key={index}
            text={message.message}
            profileImageUrl={message.user.avatar}
            isOwnMessage={message.userId === props.userid ? true : false}
            />
        ))}
            </div>
        <Sendmessage onSendMessage={props.sendMessageDm}/>
      </div>
    );
  }
  };

  export default Leftchat;