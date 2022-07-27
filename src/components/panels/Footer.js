import React from 'react';
import styled from 'styled-components';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin: 0px 15px 20px 15px;
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
          <a
            href="https://github.com/Craig-Wellspring/profile-site"
            className="navlink"
            target="_blank"
            rel="noreferrer"
          >
            This website
          </a>{' '}
          was developed using{' '}
          <a
            href="https://threejs.org/"
            className="navlink"
            target="_blank"
            rel="noreferrer"
          >
            Three.js
          </a>
          ,{' '}
          <a
            href="https://reactjs.org/"
            className="navlink"
            target="_blank"
            rel="noreferrer"
          >
            React.js
          </a>
          , and{' '}
          <a
            href="https://sass-lang.com/"
            className="navlink"
            target="_blank"
            rel="noreferrer"
          >
            Sass
          </a>
          .
        </div>
        <NavButton href="/#contact" className="navlink">
          <i className="fas fa-file-signature" />
          Craig Wellspring
        </NavButton>
      </Body>
    </div>
  );
}
