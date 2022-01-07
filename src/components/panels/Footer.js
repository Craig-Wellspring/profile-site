import React from 'react';
import styled from 'styled-components';
import TopButton from '../buttons/TopButton';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin: 15px;
`;

const NavButton = styled.a`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export default function Footer() {
  return (
    <div className="fade-in" id="footer">
      <Body className="section">
        <div>
          This website was developed using ReactJS, ThreeJS, Sass, and Google Firebase.
        </div>
        <NavButton href="/#contact" className="navlink">
          <i className="fas fa-file-signature" />
          Craig Wellspring
        </NavButton>
      </Body>
      <TopButton />
    </div>
  );
}
