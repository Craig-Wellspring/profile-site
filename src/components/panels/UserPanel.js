import React from 'react';
import styled from 'styled-components';
import { userIsAdmin } from '../../api/auth';
import SignOutButton from '../buttons/SignOutButton';
import MessageReceiver from './MessageReceiver';
import MyMessages from './MyMessages';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export default function UserPanel() {
  return (
    <Section>
      {userIsAdmin() ? <MessageReceiver /> : <MyMessages />}
      <Section className="section">
        <SignOutButton />
      </Section>
    </Section>
  );
}
