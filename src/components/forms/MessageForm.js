import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colorScheme from '../../JSON/globalVars/colorScheme.json';
import { updateMessage } from '../../api/data/message-data';

const MessageCard = styled.form`
  background-color: ${colorScheme.backgroundColorFaded};
  &:hover {
    background-color: ${colorScheme.backgroundColor};
  }
  width: 200px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 5px;
  margin: 10px;
  clip-path: polygon(
    0 10px,
    10px 0,
    Calc(100% - 10px) 0,
    100% 10px,
    100% Calc(100% - 10px),
    Calc(100% - 10px) 100%,
    10px 100%,
    0% Calc(100% - 10px),
    0 10px
  );
`;

const Sender = styled.input`
  padding: 10px;
  border-bottom: 1px solid black;
`;

const Content = styled.textarea`
  padding: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  gap: 5px;
  margin: 5px;
`;

const initialState = {
  name: '',
  message: '',
  firebaseKey: '',
};

export default function MessageForm({ msg, setShowForm, setMessages }) {
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    setFormInput(msg);
  }, []);

  const handleSubmit = () => {
    updateMessage(formInput).then((msgs) => {
      setMessages(msgs);
    });
  };

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <MessageCard onSubmit={handleSubmit}>
      <Sender
        name="name"
        type="text"
        onChange={handleChange}
        value={formInput.name}
        required
      />
      <Content
        name="message"
        onChange={handleChange}
        value={formInput.message}
        required
      />
      <ButtonContainer>
        <button type="submit" className="blue-button">
          {null}
        </button>
        <button
          type="button"
          className="orange-button"
          onClick={() => setShowForm(false)}
        >
          {null}
        </button>
      </ButtonContainer>
    </MessageCard>
  );
}

MessageForm.propTypes = {
  msg: PropTypes.shape({
    name: PropTypes.string,
    message: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  setShowForm: PropTypes.func.isRequired,
  setMessages: PropTypes.func.isRequired,
};
