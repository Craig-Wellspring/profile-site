import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { currentUID } from '../../api/auth';
import { getMessages } from '../../api/data/message-data';
import Message from '../listables/Message';

const Messenger = styled.div``;

const MessageList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

export default function MyMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getMessages(currentUID()).then((msgs) => {
      if (isMounted) setMessages(msgs);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <Messenger className="section">
      Messages Sent
      <MessageList>
        {messages.map((msg) => (
          <Message key={msg.firebaseKey} msg={msg} setMessages={setMessages} />
        ))}
      </MessageList>
    </Messenger>
  );
}
