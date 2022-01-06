import React from 'react';
import styled from 'styled-components';

const Button = styled.a`
  font-size: 200%;
  margin-top: 10px;
`;

export default function TopButton() {
  return (
    <Button href="#" className="navlink">
      <i className="fas fa-arrow-alt-circle-up" />
    </Button>
  );
}
