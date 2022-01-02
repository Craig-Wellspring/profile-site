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
      <svg viewBox="0 0 200 20">
        <text x="0" y="15">
          Craig Wellspring
        </text>
      </svg>

      <i className="fas fa-envelope" />
      <NavLink href="mailto:wellspring.craig@gmail.com" className="navlink">
        <svg viewBox="0 0 300 20">
          <text x="0" y="15">
            wellspring.craig@gmail.com
          </text>
        </svg>
      </NavLink>

      <i className="fab fa-github" />
      <NavLink
        href="https://github.com/Craig-Wellspring"
        className="navlink"
        target="_blank"
      >
        <svg viewBox="0 0 320 20">
          <text x="0" y="15">
            https://github.com/Craig-Wellspring
          </text>
        </svg>
      </NavLink>

      <i className="fab fa-linkedin" />
      <NavLink
        href="https://www.linkedin.com/in/craigwellspring/"
        className="navlink"
        target="_blank"
      >
        <svg viewBox="0 0 320 20">
          <text x="0" y="15">
            https://www.linkedin.com/in/craigwellspring
          </text>
        </svg>
      </NavLink>
    </InfoSection>
  );
}
