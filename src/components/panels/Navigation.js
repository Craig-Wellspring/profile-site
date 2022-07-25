import React from 'react';
import styled from 'styled-components';

const NavBar = styled.div`
  display: flex;
  position: sticky;
  top: 10px;
  z-index: 1;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
  padding: 10px;
  margin: 10px 10px;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
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
  position: relative;
  display: flex;
  width: 100%;
  column-gap: 10px;
  justify-content: right;
  align-items: center;
  @media only screen and (max-width: 800px) {
    justify-content: center;
  }
`;

const Title = styled.a``;

const NavButton = styled.a`
  padding: 5px;
  &:hover {
    font-size: 120%;
  }
`;

const NavIcon = styled.a`
  font-size: 150%;
  padding: 5px;

  &:hover {
    font-size: 180%;
  }
`;

export default function Navigation() {
  return (
    <NavBar className="navigation">
      <LeftContainer>
        <NavButton href="/#about" className="navlink">
          About
        </NavButton>
        <NavButton href="/#projects" className="navlink">
          Projects
        </NavButton>
        <NavButton href="/#technologies" className="navlink">
          Technologies
        </NavButton>
      </LeftContainer>
      <CenterContainer>
        <Title href="/#home" className="navlink">
          Craig Wellspring
        </Title>
      </CenterContainer>
      <RightContainer>
        <NavButton href="/#contact" className="navlink">
          Contact
        </NavButton>
        <NavIcon
          href="https://github.com/Craig-Wellspring"
          className="navlink"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-github" />
        </NavIcon>
        <NavIcon
          href="https://www.linkedin.com/in/craigwellspring/"
          className="navlink"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-linkedin" />
        </NavIcon>
      </RightContainer>
    </NavBar>
  );
}
