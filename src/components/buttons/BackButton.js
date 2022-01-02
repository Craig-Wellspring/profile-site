import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
  font-size: 200%;
  background-color: transparent;

  padding: 10px;
  border: 0;
  margin: 0;
`;

export default function BackButton() {
  const history = useHistory();

  return (
    <Button type="button" className="navlink" onClick={() => history.goBack()}>
      <i className="fas fa-arrow-alt-circle-left" />
    </Button>
  );
}
