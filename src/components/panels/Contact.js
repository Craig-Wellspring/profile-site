import React from 'react';
import styled from 'styled-components';
import LinkTree from './LinkTree';
import MessageSender from './MessageSender';
import Resume from './Resume';

const Body = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;

  padding: 10px;
  width: 90%;
`;

const ContactPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  align-self: flex-start;
  align-items: center;
  justify-content: center;
`;

export default function Contact() {
  return (
    <Body id="contact" className="slide-in">
      <ContactPanel>
        <LinkTree />
        <Resume />
      </ContactPanel>

      <MessageSender />
    </Body>
  );
}
