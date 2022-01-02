import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colorScheme from '../../JSON/globalVars/colorScheme.json';
import { deleteMessage } from '../../api/data/message-data';
import { currentUID, userIsAdmin } from '../../api/auth';
import MessageForm from '../forms/MessageForm';

const MessageCard = styled.div`
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

const Sender = styled.div`
  padding: 10px;
  border-bottom: 1px solid black;
`;

const Content = styled.div`
  padding: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  gap: 5px;
`;

export default function Message({ msg, setMessages }) {
  const [showForm, setShowForm] = useState(false);

  const handleDelete = () => {
    deleteMessage(msg).then(setMessages);
  };

  const handleEdit = () => {
    setShowForm(true);
  };

  return (
    <>
      {showForm ? (
        <MessageForm
          msg={msg}
          setShowForm={setShowForm}
          setMessages={setMessages}
        />
      ) : (
        <MessageCard>
          <Sender>{msg.name}</Sender>
          <Content>{msg.message}</Content>
          <ButtonContainer>
            {msg.uid === currentUID() && (
              <button
                type="button"
                className="blue-button"
                onClick={handleEdit}
              >
                {null}
              </button>
            )}
            {(msg.uid === currentUID() || userIsAdmin()) && (
              <button
                type="button"
                className="orange-button"
                onClick={handleDelete}
              >
                {null}
              </button>
            )}
          </ButtonContainer>
        </MessageCard>
      )}
    </>
  );
}

Message.propTypes = {
  msg: PropTypes.shape({
    name: PropTypes.string,
    message: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  setMessages: PropTypes.func.isRequired,
};
