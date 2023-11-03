import React, { useState, useEffect } from 'react';
import { auth, firestore } from './firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const messagesRef = collection(firestore, 'messages');
      await addDoc(messagesRef, {
        text: newMessage,
        timestamp: serverTimestamp(),
        uid: auth.currentUser.uid,
        displayName: auth.currentUser.displayName,
      });
      setNewMessage('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const messageRef = doc(firestore, 'messages', messageId);
      await deleteDoc(messageRef);

      // Update the local state to remove the deleted message
      setMessages((prevMessages) => prevMessages.filter((message) => message.id !== messageId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  useEffect(() => {
    const q = query(collection(firestore, 'messages'), orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs
          .filter((doc) => doc.exists)
          .map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.uid === auth.currentUser.uid ? 'user' : 'recipient'}`}
          >
            <div className="message-header">
              {message.uid !== auth.currentUser.uid && (
                <div className="recipient-name">{message.displayName}</div>
              )}
            </div>
            <div className="message-text">{message.text}</div>
            {message.uid === auth.currentUser.uid && (
              <button className="delete-button" onClick={() => deleteMessage(message.id)}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          className="message-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
