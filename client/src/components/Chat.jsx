import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from './Message';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
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

    const sendMessage = async () => {
        if (input.trim()) {
            const newMessage = { text: input, sender: 'user' };
            setMessages([...messages, newMessage]);

            try {
                const response = await axios.post('http://localhost:5000/api/chat/ask', {
                    message: input,
                    userID
                });

                const assistantMessage = { text: response.data.response, sender: 'assistant' };
                setMessages([...messages, newMessage, assistantMessage]);
            } catch (error) {
                console.error('Error sending message:', error);
            }
            setInput('');
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <Message key={index} text={msg.text} sender={msg.sender} />
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
