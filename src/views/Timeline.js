import React from 'react';
import styled from 'styled-components';
import TopButton from '../components/buttons/TopButton';
import TimelineLong from '../components/panels/TimelineLong';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95%;
  padding: 10px;
`;

export default function Timeline() {
  return (
    <Container>
      <TimelineLong />
      <br />
      <TopButton />
    </Container>
  );
}
