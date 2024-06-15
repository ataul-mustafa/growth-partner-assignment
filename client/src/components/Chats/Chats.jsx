import React, { useEffect, useState } from 'react';
import './Chats.css';
import sendButton from '../../assets/sendButton.png';
import beforeChatImage from '../../assets/beforeChatImage.png';
import lockIcon from '../../assets/lockIcon.png';
import backIcon from '../../assets/backIcon.png';
import { getCurrentTime, getFormattedDate } from '../../utils/dateTime';
import axios from 'axios';

function Chats({ openedGrp, closeChatsReciever }) {
  const [chat, setChat] = useState({ q: '', ans: '' });
  const [activeGrp, setActiveGrp] = useState({});
  const [closeChats, setCloseChats] = useState(true);
  const [userID, setUserID] = useState('');

  useEffect(() => {
    const storedUserID = localStorage.getItem('userID');
    if (!storedUserID) {
      const newUserID = `user_${Date.now()}`;
      localStorage.setItem('userID', newUserID);
      setUserID(newUserID);
    } else {
      setUserID(storedUserID);
    }
  }, []);

  useEffect(() => {
    if (openedGrp) {
      setActiveGrp(openedGrp);
      setCloseChats(false);
    }
  }, [openedGrp]);

  const getAIResponse = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/chat/ask', {
        message: chat.q,
        userID
      });
      return data.response;
    } catch (error) {
      console.log(error);
      return '';
    }
  };

  const submitFormFun = async (e) => {
    e.preventDefault();

    const newChat = {
      date: getFormattedDate(),
      time: getCurrentTime(),
      chat: { ...chat, ans: 'Generating...' }
    };

    let allChats = JSON.parse(localStorage.getItem('chatGroups')) || [];

    if (chat.q) {
      let currentGroupChats = allChats[openedGrp.index]?.chats || [];

      const updatedChats = [...currentGroupChats, newChat];

      const updatedGroup = {
        ...allChats[openedGrp.index],
        chats: updatedChats
      };

      allChats[openedGrp.index] = updatedGroup;

      localStorage.setItem('chatGroups', JSON.stringify(allChats));
      setActiveGrp(updatedGroup); // Update active group immediately
      setChat({ q: '', ans: '' }); // Clear the chat input

      // Get AI response and update the chat
      const response = await getAIResponse();
      updatedChats[updatedChats.length - 1].chat.ans = response;

      allChats[openedGrp.index].chats = updatedChats;
      localStorage.setItem('chatGroups', JSON.stringify(allChats));
      setActiveGrp({ ...activeGrp, chats: updatedChats }); // Update active group with AI response
    }
  };

  const addChatHandler = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitFormFun(e);
    }
  };

  const closeHandler = () => {
    closeChatsReciever(true);
    setCloseChats(true);
  };

  return (
    <div className={closeChats ? 'hideChats chatsContainer' : 'chatsContainer'}>
      {openedGrp && (
        <div className='chatsBox'>
          <div className='head'>
            <img onClick={closeHandler} src={backIcon} alt="" />
            <div style={{ backgroundColor: activeGrp.color }} className="prflIcon">
              {activeGrp.profileLetters}
            </div>
            <div className="groupName">{activeGrp.groupName}</div>
          </div>
          <ul>
            {activeGrp.chats &&
              activeGrp.chats.map((chatt, i) => (
                <li key={i}>
                  <div className="q">
                    <div className="message q">{chatt.chat.q}</div>
                    <div className="dateTime">
                      <div className="time">{chatt.time}</div>
                      <div className="date">{chatt.date}</div>
                    </div>
                  </div>
                  <div className="ans">
                    <div className="message ans">{chatt.chat.ans}</div>
                    <div className="dateTime">
                      <div className="time">{chatt.time}</div>
                      <div className="date">{chatt.date}</div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
          <form onKeyDown={addChatHandler} className="inputBox">
            <textarea
              value={chat.q}
              onChange={(e) => setChat({ ...chat, q: e.target.value })}
              placeholder='Enter your question here...'
            ></textarea>
            <button onClick={submitFormFun}>
              <img src={sendButton} alt="send" />
            </button>
          </form>
        </div>
      )}
      {!openedGrp && (
        <div className='chatsImg'>
          <img src={beforeChatImage} alt="BackgroundImage" />
          <h1>Pocket Chats</h1>
          <p>Send and receive messages without keeping your phone online. Use Pocket Chats on up to 4 linked devices and 1 mobile phone</p>
          <div className='bottomPara'>
            <img src={lockIcon} alt="" />
            end-to-end encrypted
          </div>
        </div>
      )}
    </div>
  );
}

export default Chats;
