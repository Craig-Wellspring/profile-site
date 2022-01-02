import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colorScheme from '../../JSON/globalVars/colorScheme.json';

const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }

  padding: 10px;
  margin: 20px 10px;
`;

const LeftContainer = styled.div`
  display: flex;
  width: 100%;
  column-gap: 10px;
  justify-content: left;
  align-items: center;
  @media only screen and (max-width: 800px) {
    justify-content: center;
  }
`;

const CenterContainer = styled.div`
  font-size: 220%;

  display: flex;
  width: 100%;
  white-space: nowrap;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const RightContainer = styled.div`
  display: flex;
  width: 100%;
  column-gap: 10px;
  justify-content: right;
  align-items: center;
  @media only screen and (max-width: 800px) {
    justify-content: center;
  }
`;

const NavButton = styled.a`
  padding: 5px;
`;

const NavIcon = styled.a`
  font-size: 150%;
  padding: 5px;
`;

const AccountPageButton = styled(Link)`
  border: 0;
  background-color: transparent;
  color: ${colorScheme.textColor};
  padding: 2px 5px;
`;

export default function Navigation() {
  return (
    <NavBar className="navigation">
      <LeftContainer>
        <NavButton href="/#about" className="navlink">
          About
        </NavButton>
        <NavButton href="/#portfolio" className="navlink">
          Portfolio
        </NavButton>
        <NavButton href="/#technologies" className="navlink">
          Technologies
        </NavButton>
      </LeftContainer>
      <CenterContainer>
        <NavButton href="/#home" className="navlink">
          Craig Wellspring
        </NavButton>
      </CenterContainer>
      <RightContainer>
        <NavButton href="/contact" className="navlink">
          Contact
        </NavButton>
        <NavIcon
          href="https://github.com/Craig-Wellspring"
          className="navlink"
          target="_blank"
        >
          <i className="fab fa-github" />
        </NavIcon>
        <NavIcon
          href="https://www.linkedin.com/in/craigwellspring/"
          className="navlink"
          target="_blank"
        >
          <i className="fab fa-linkedin" />
        </NavIcon>
        <AccountPageButton className="navlink" to="/account">
          <i className="fas fa-sign-in-alt" />
        </AccountPageButton>
      </RightContainer>
    </NavBar>
  );
}
