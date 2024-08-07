// src/components/Chat.js

import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesCollection = collection(db, 'messages');
      const messageSnapshot = await getDocs(messagesCollection);
      const messageList = messageSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(messageList);
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Chat</h2>
      <ul>
        {messages.map(message => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
