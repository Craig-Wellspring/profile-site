import React, { useState } from 'react';
import styled from 'styled-components';

const Messenger = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: top;
  width: 100%;

  padding: 20px;
`;

export default function MessageSender() {
  const [input, setInput] = useState({ name: '', message: '' });

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn(input);
    setInput((prevState) => ({
      name: prevState.name,
      message: '',
    }));
  };

  return (
    <Messenger className="section" onSubmit={handleSubmit}>
      <h4>Leave a Message</h4>
      <input
        type="text"
        className="input-field"
        style={{ textAlign: 'center', width: '85%' }}
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
        style={{ width: '95%' }}
        rows="7"
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
