import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { currentUID, currentUser } from '../../api/auth';
import { createMessage } from '../../api/data/message-data';

const Messenger = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: top;

  padding: 20px;
`;

export default function MessageSender() {
  const [input, setInput] = useState({ name: '', message: '' });

  const checkUser = () => {
    const user = currentUser()?.displayName;
    if (!user) {
      window.setTimeout(checkUser, 50);
    } else {
      setInput(() => ({ name: user }));
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn(input);
    createMessage({ ...input, uid: currentUID() || 'Nonuser' });
    setInput((prevState) => ({
      name: prevState.name,
      message: '',
    }));
  };

  return (
    <Messenger className="section" onSubmit={handleSubmit}>
      Send a Message
      <input
        type="text"
        className="input-field"
        style={{ textAlign: 'center', width: '90%' }}
        name="name"
        placeholder="Your Name"
        value={input.name}
        onChange={handleChange}
        required
      />
      <textarea
        className="input-field"
        name="message"
        placeholder="Enter a message"
        rows="5"
        value={input.message}
        onChange={handleChange}
        required
      />
      <button type="submit" className="blue-button">
        Send
      </button>
    </Messenger>
  );
}
