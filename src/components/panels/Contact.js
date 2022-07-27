import React from 'react';
import styled from 'styled-components';
import LinkTree from './LinkTree';
// import MessageSender from './MessageSender';
import Resume from './Resume';
import PanelHeader from '../GenericComponents';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  padding: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* flex-direction: column; */
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

export default function Contact() {
  return (
    <div id="contact" style={{ scrollMarginTop: '100px' }}>
      <div className="slide-in on-left">
        <PanelHeader>Contact</PanelHeader>
        <Body>
          <LinkTree />
          {/* <ContactPanel><MessageSender /></ContactPanel> */}
          <Container>
            <Resume type="resume" />
            <Resume type="cv" />
          </Container>
        </Body>
      </div>
    </div>
  );
}
