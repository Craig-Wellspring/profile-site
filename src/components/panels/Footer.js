import React from 'react';
import styled from 'styled-components';
import TopButton from '../buttons/TopButton';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const NavButton = styled.a`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export default function Footer() {
  return (
    <div className="section">
      <Body>
        <div>
          This website was developed using ReactJS, Sass, ThreeJS, and Google
          Firebase.
        </div>
        <NavButton href="/contact" className="navlink">
          <i className="fas fa-file-signature" />
          Craig Wellspring
        </NavButton>
      </Body>
      <TopButton />
    </div>
  );
}
