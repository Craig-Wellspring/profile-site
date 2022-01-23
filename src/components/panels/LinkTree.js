import React from 'react';
import styled from 'styled-components';

const InfoSection = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px 5px;
  text-align: left;
  align-items: center;
  justify-content: center;
`;

const NavLink = styled.a``;

export default function LinkTree() {
  return (
    <InfoSection className="section">
      <i className="fas fa-signature" />
      <h3>Craig Wellspring</h3>

      <i className="fas fa-envelope" />
      <NavLink
        href="mailto:wellspring.craig@gmail.com"
        className="navlink"
      >
        wellspring.craig@gmail.com
      </NavLink>

      <i className="fab fa-github" />
      <NavLink
        href="https://github.com/Craig-Wellspring"
        className="navlink"
        target="_blank"
        rel="noreferrer"
      >
        github.com/Craig-Wellspring
      </NavLink>

      <i className="fab fa-linkedin" />
      <NavLink
        href="https://www.linkedin.com/in/craigwellspring/"
        className="navlink"
        target="_blank"
        rel="noreferrer"
      >
        linkedin.com/in/craigwellspring
      </NavLink>
    </InfoSection>
  );
}
